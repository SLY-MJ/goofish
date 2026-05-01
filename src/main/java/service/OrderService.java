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
    public void add(long itemId, long buyerId, int number) throws ServiceException {
        verify(itemId, buyerId);
        try {
            Item item = itemDao.findById(itemId);
            if (item == null) {
                throw new ServiceException(404, "Item not found");
            }
            if (item.getSellerId() == buyerId) {
                throw new ServiceException(400, "You cannot buy your own item");
            }
            int stock = item.getStock();
            if (item.getStatus() != ItemStatus.ON_SALE) {
                throw new ServiceException(400, "Item is not available for purchase");
            }
            if (stock < number) {
                throw new ServiceException(400, "Insufficient stock");
            }
            long orderId = orderDao.add(itemId, buyerId, item.getSellerId(), number, item.getPrice(), OrderStatus.CREATED);
            if (orderId <= 0) {
                throw new ServiceException(500, "Failed to create order");
            }
            itemDao.updateStock(itemId, stock - number);
            if (stock == number) {
                itemDao.updateStatus(itemId, ItemStatus.SOLD);
            }
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void delete(long orderId, long operatorUserId) throws ServiceException {
        verify(orderId, operatorUserId);
        try {
            orderDao.delete(orderId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteByItemId(long itemId, long operatorUserId) throws ServiceException {
        verify(itemId, operatorUserId);
        try {
            List<Order> orders = orderDao.findByItemId(itemId);
            for (Order order : orders) {
                if (order.getBuyerId() == operatorUserId || order.getSellerId() == operatorUserId) {
                    orderDao.delete(order.getId());
                    return;
                }
            }
            throw new ServiceException(404, "Order not found");
        }catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void changeStatus(long id, OrderStatus status) throws ServiceException {
        try {
            orderDao.updateStatus(id, status);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void trade(long orderId, long operatorUserId) throws ServiceException {
        verify(orderId, operatorUserId);
        isBuyer(orderId, operatorUserId);
        payable(orderId);
        try {
            Order order =getOrder(orderId);
            int number = order.getNumber();
            double amount=order.getAmount();
            double price=number*amount;
            User buyer = userDao.findById(order.getBuyerId());
            User seller = userDao.findById(order.getSellerId());
            if (buyer == null || seller == null) {
                throw new ServiceException(404, "Order user not found");
            }
            if (buyer.getWalletBalance() < price) {
                throw new ServiceException(400, "Insufficient wallet balance");
            }

            Item item = itemDao.findById(order.getItemId());
            if (item == null) {
                throw new ServiceException(404, "Item not found");
            }
            buyer.setWalletBalance(buyer.getWalletBalance() - price);
            seller.setWalletBalance(seller.getWalletBalance() + price);
            userDao.updateWalletBalance(buyer.getId(), buyer.getWalletBalance()-price);
            userDao.updateWalletBalance(seller.getId(), seller.getWalletBalance()+price);
            orderDao.updateStatus(orderId, OrderStatus.PAID);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void cancel(long orderId, long operatorUserId) throws ServiceException {
        verify(orderId, operatorUserId);
        Order order=getOrder(orderId);
        if (order.getStatus() == OrderStatus.PAID) {
            throw new ServiceException(400, "Paid orders cannot be cancelled");
        }
        int number=order.getNumber();
        long itemID=order.getItemId();

        try {
            orderDao.updateStatus(orderId, OrderStatus.CANCELLED);
            int stock=itemDao.findById(itemID).getStock();
            itemDao.updateStock(itemID, stock + number);
            if (stock==0){
                itemDao.updateStatus(itemID, ItemStatus.ON_SALE);
            }
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

    private void verify(long id1, long id2) throws ServiceException {
        verify(id1);
        verify(id2);
    }

    private void verify(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(400, "Invalid order request");
        }
    }

    private void isBuyer(long orderID,long userID) throws ServiceException {
        Order order = getOrder(orderID);
        if (order.getSellerId() != userID) {
            throw new ServiceException(403, "No permission to operate this order");
        }
    }

    private void payable(long orderID) throws ServiceException {
        Order order = getOrder(orderID);
        if (order.getStatus()!= OrderStatus.CREATED){
            throw new ServiceException(400, "Order is not payable");
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
