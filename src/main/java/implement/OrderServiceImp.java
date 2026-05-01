package implement;

import bean.OrderResponse;
import enums.OrderStatus;
import exception.ServiceException;

import java.util.List;

public interface OrderServiceImp {
    void add(long itemId, long buyerId, int number) throws ServiceException;

    void delete(long id, long operatorUserId) throws ServiceException;

    void deleteByItemId(long itemId, long operatorUserId) throws ServiceException;

    void changeStatus(long id, OrderStatus status) throws ServiceException;

    void trade(long id, long operatorUserId) throws ServiceException;

    void cancel(long id, long operatorUserId) throws ServiceException;

    List<OrderResponse> getByBuyer(long id) throws ServiceException;

    List<OrderResponse> getBySeller(long id) throws ServiceException;
}
