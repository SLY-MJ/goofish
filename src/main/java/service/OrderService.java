package service;

import bean.OrderResponse;
import dao.ItemDao;
import dao.OrderDao;
import dao.UserDao;
import entity.Item;
import entity.Order;
import entity.User;
import enums.OrderStatus;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderService implements OrderServiceImp {
    private final OrderDao orderDao = new OrderDao();
    private final UserDao userDao = new UserDao();
    private final ItemDao itemDao = new ItemDao();

    public void add(long itemId, long buyerId, long sellerId) throws ServiceException {
        if (itemId <= 0) {
            throw new ServiceException(401, "商品id不合法");
        }
        double amount = 0;
        try {
            amount = itemDao.findById(itemId).getPrice();
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
        if (buyerId <= 0) {
            throw new ServiceException(401, "买家id不合法");
        }
        if (sellerId <= 0) {
            throw new ServiceException(401, "卖家id不合法");
        }
        if (amount <= 0) {
            throw new ServiceException(401, "金额不合法");
        }
        try {
            orderDao.add(itemId, buyerId, sellerId, amount, OrderStatus.CREATED);
        } catch (Exception e) {
            throw new ServiceException(500, "订单创建失败");
        }
    }

    public void delete(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "订单id不合法");
        }
        try {
            orderDao.delete(id);
        } catch (Exception e) {
            throw new ServiceException(500, "订单删除失败");
        }

    }

    public void changeStatus(long id, OrderStatus status) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "订单id不合法");
        }
        try {
            orderDao.updateStatus(id, status);
        } catch (Exception e) {
            throw new ServiceException(500, "订单状态修改失败");
        }
    }

    public void trade(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "订单id不合法");
        }
        try {
            Order order = orderDao.findById(id);
            if (order == null) {
                throw new ServiceException(404, "订单不存在");
            }
            if (order.getStatus() == OrderStatus.PAID) {
                throw new ServiceException(401, "订单已支付");
            }
            User buyer = userDao.findById(order.getBuyerId());
            User seller = userDao.findById(order.getSellerId());
            double amount = order.getAmount();
            if (buyer.getWalletBalance() < amount) {
                orderDao.updateStatus(id, OrderStatus.REFUNDED);
                throw new ServiceException(401, "买家余额不足");
            }
            buyer.setWalletBalance(buyer.getWalletBalance() - amount);
            seller.setWalletBalance(seller.getWalletBalance() + amount);
            userDao.update(buyer);
            userDao.update(seller);
            orderDao.updateStatus(id, OrderStatus.PAID);
        } catch (Exception e) {
            throw new ServiceException(500, "订单交易失败");
        }
    }

    public void cancel(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "订单id不合法");
        }
        Order order;
        try {
            order = orderDao.findById(id);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (order == null) {
            throw new ServiceException(404, "订单不存在");
        }
        if (order.getStatus() == OrderStatus.PAID) {
            throw new ServiceException(401, "订单已支付，无法取消");
        }
        try {
            orderDao.updateStatus(id, OrderStatus.CANCELED);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public List<OrderResponse> getByBuyer(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "买家id不合法");
        }
        List<Order> orders;
        try {
            orders = orderDao.findByBuyerId(id);
        } catch (Exception e) {
            throw new ServiceException(500, "订单查询失败");
        }
        if (orders == null || orders.isEmpty()) {
            return null;
        }
        List<OrderResponse> list = new ArrayList<>();
        try {
            User buyer = userDao.findById(id);
            for (Order order : orders) {
                Item item = itemDao.findById(order.getItemId());
                User seller = userDao.findById(order.getSellerId());
                OrderResponse orderResponse = OrderResponse.dto(order, item, buyer, seller);
                list.add(orderResponse);
            }
        } catch (Exception e) {
            throw new ServiceException(500, "订单查询失败");
        }
        return list;
    }

    public List<OrderResponse> getBySeller(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "卖家id不合法");
        }
        List<Order> orders;
        try {
            orders = orderDao.findBySellerId(id);
        } catch (Exception e) {
            throw new ServiceException(500, "订单查询失败");
        }
        if (orders == null || orders.isEmpty()) {
            return null;
        }
        List<OrderResponse> list = new ArrayList<>();
        try {
            User seller = userDao.findById(id);
            for (Order order : orders) {
                Item item = itemDao.findById(order.getItemId());
                User buyer = userDao.findById(order.getSellerId());
                OrderResponse orderResponse = OrderResponse.dto(order, item, buyer, seller);
                list.add(orderResponse);
            }
        } catch (Exception e) {
            throw new ServiceException(500, "订单查询失败");
        }
        return list;
    }
}
