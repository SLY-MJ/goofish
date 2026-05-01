package service;

import bean.OrderResponse;
import dao.ItemDao;
import dao.OrderDao;
import dao.UserDao;
import entity.Item;
import entity.Order;
import entity.User;
import enums.ItemStatus;
import enums.OrderStatus;
import exception.ServiceException;
import implement.OrderServiceImp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderService implements OrderServiceImp {
    private final OrderDao orderDao = new OrderDao();
    private final UserDao userDao = new UserDao();
    private final ItemDao itemDao = new ItemDao();

    @Override
    public void add(long itemId, long buyerId, long ignoredSellerId) throws ServiceException {
        if (itemId <= 0 || buyerId <= 0) {
            throw new ServiceException(400, "Invalid order request");
        }

        try {
            Item item = itemDao.findById(itemId);
            if (item == null) {
                throw new ServiceException(404, "Item not found");
            }
            if (item.getSellerId() == buyerId) {
                throw new ServiceException(400, "You cannot buy your own item");
            }
            if (item.getStatus() != ItemStatus.ON_SALE || item.getStock() <= 0) {
                throw new ServiceException(400, "Item is not available for purchase");
            }
            long orderId = orderDao.add(itemId, buyerId, item.getSellerId(), item.getPrice(), OrderStatus.CREATED);
            if (orderId <= 0) {
                throw new ServiceException(500, "Failed to create order");
            }
            int stock = item.getStock();
            itemDao.updateStock(itemId, stock-1);
            if (stock==1){
                itemDao.updateStatus(itemId, ItemStatus.SOLD);
            }
        }catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void delete(long orderId, long operatorUserId) throws ServiceException {
        if (orderId <= 0 || operatorUserId <= 0) {
            throw new ServiceException(400, "Invalid order request");
        }

        Order order = getOrder(orderId);
        if (order.getBuyerId() != operatorUserId && order.getSellerId() != operatorUserId) {
            throw new ServiceException(403, "No permission to delete this order");
        }

        try {
            orderDao.delete(orderId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteByItemId(long itemId, long operatorUserId) throws ServiceException {
        if (itemId <= 0 || operatorUserId <= 0) {
            throw new ServiceException(400, "Invalid order request");
        }

        try {
            List<Order> orders = orderDao.findByItemId(itemId);
            for (Order order : orders) {
                if (order.getBuyerId() == operatorUserId || order.getSellerId() == operatorUserId) {
                    orderDao.delete(order.getId());
                    return;
                }
            }
            throw new ServiceException(404, "Order not found");
        } catch (ServiceException e) {
            throw e;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void changeStatus(long id, OrderStatus status) throws ServiceException {
        getOrder(id);
        try {
            orderDao.updateStatus(id, status);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void trade(long orderId, long operatorUserId) throws ServiceException {
        if (orderId <= 0 || operatorUserId <= 0) {
            throw new ServiceException(400, "Invalid order request");
        }

        try {
            Order order = getOrder(orderId);
            if (order.getBuyerId() != operatorUserId) {
                throw new ServiceException(403, "No permission to pay this order");
            }
            if (order.getStatus() == OrderStatus.PAID) {
                throw new ServiceException(400, "Order is already paid");
            }
            if (order.getStatus() == OrderStatus.CANCELLED) {
                throw new ServiceException(400, "Cancelled orders cannot be paid");
            }

            User buyer = userDao.findById(order.getBuyerId());
            User seller = userDao.findById(order.getSellerId());
            if (buyer == null || seller == null) {
                throw new ServiceException(404, "Order user not found");
            }
            if (buyer.getWalletBalance() < order.getAmount()) {
                throw new ServiceException(400, "Insufficient wallet balance");
            }

            Item item = itemDao.findById(order.getItemId());
            if (item == null) {
                throw new ServiceException(404, "Item not found");
            }
            if (item.getStatus() != ItemStatus.ON_SALE || item.getStock() <= 0) {
                throw new ServiceException(400, "Item is no longer available");
            }

            buyer.setWalletBalance(buyer.getWalletBalance() - order.getAmount());
            seller.setWalletBalance(seller.getWalletBalance() + order.getAmount());
            userDao.updateWalletBalance(buyer);
            userDao.updateWalletBalance(seller);
            int stock = item.getStock();
            long itemId=item.getId();
            if (stock<=1) {
                itemDao.updateStatus(itemId, ItemStatus.SOLD);
            }
            itemDao.updateStock(itemId, stock);
            orderDao.updateStatus(orderId, OrderStatus.PAID);
        }catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void cancel(long orderId, long operatorUserId) throws ServiceException {
        if (orderId <= 0 || operatorUserId <= 0) {
            throw new ServiceException(400, "Invalid order request");
        }

        Order order = getOrder(orderId);
        if (order.getBuyerId() != operatorUserId) {
            throw new ServiceException(403, "No permission to cancel this order");
        }
        if (order.getStatus() == OrderStatus.PAID) {
            throw new ServiceException(400, "Paid orders cannot be cancelled");
        }

        try {
            orderDao.updateStatus(orderId, OrderStatus.CANCELLED);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<OrderResponse> getByBuyer(long buyerId) throws ServiceException {
        try {
            List<Order> orders = orderDao.findByBuyerId(buyerId);
            User buyer = userDao.findById(buyerId);
            List<OrderResponse> responses = new ArrayList<>();
            for (Order order : orders) {
                Item item = itemDao.findById(order.getItemId());
                User seller = userDao.findById(order.getSellerId());
                responses.add(OrderResponse.dto(order, item, buyer, seller));
            }
            return responses;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<OrderResponse> getBySeller(long sellerId) throws ServiceException {
        try {
            List<Order> orders = orderDao.findBySellerId(sellerId);
            User seller = userDao.findById(sellerId);
            List<OrderResponse> responses = new ArrayList<>();
            for (Order order : orders) {
                Item item = itemDao.findById(order.getItemId());
                User buyer = userDao.findById(order.getBuyerId());
                responses.add(OrderResponse.dto(order, item, buyer, seller));
            }
            return responses;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private Order getOrder(long orderId) throws ServiceException {
        try {
            Order order = orderDao.findById(orderId);
            if (order == null) {
                throw new ServiceException(404, "Order not found");
            }
            return order;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
