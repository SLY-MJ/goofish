package implement;

import entity.User;
import exception.ServiceException;

public interface AdminServiceImp {
    User registerAdmin(long id,String username, String password) throws ServiceException;

    void deleteUser(long adminId,long id) throws ServiceException;

    void deleteItem(long adminId,long id) throws ServiceException;

    void deleteComment(long adminId,long id) throws ServiceException;

}
