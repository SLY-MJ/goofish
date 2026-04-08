package service;

import bean.OrderResponse;
import entity.Order;
import enums.OrderStatus;
import exception.ServiceException;

import java.util.List;

public interface OrderServiceImp {
    void add(long itemId, long buyerId, long sellerIdu) throws ServiceException;

    void delete(long id) throws ServiceException;

    void changeStatus(long id, OrderStatus status) throws ServiceException;

    void trade(long id) throws ServiceException;

    void cancel(long id) throws ServiceException;

    List<OrderResponse> getByBuyer(long id) throws ServiceException;

    List<OrderResponse> getBySeller(long id) throws ServiceException;
}
