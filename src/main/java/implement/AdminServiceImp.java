package implement;

import entity.Item;
import entity.User;
import exception.ServiceException;

import java.util.List;

public interface AdminServiceImp {
    User registerAdmin(long id,String username, String password) throws ServiceException;

    void deleteUser(long adminId,long id) throws ServiceException;

    void banUser(long adminId,long id) throws ServiceException;

    void unBanUser(long adminId,long id) throws ServiceException;

    void deleteItem(long adminId,long id) throws ServiceException;

    void deleteComment(long adminId,long id) throws ServiceException;

    void approveItem(long adminId,long id) throws ServiceException;

    void rejectItem(long adminId,long id,String reason) throws ServiceException;

    List<Item> getPendingItems(long adminId) throws ServiceException;

    List<Item> getAllItems(long adminId) throws ServiceException;

    List<User> getAllUsers(long adminId) throws ServiceException;
}
