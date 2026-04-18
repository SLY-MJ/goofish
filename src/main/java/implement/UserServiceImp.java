package implement;

import entity.User;
import exception.ServiceException;

import java.util.List;

public interface UserServiceImp {
    User register(String username, String password) throws ServiceException;

    User login(String username, String password) throws ServiceException;

    void deleteUser(long id) throws ServiceException;

    User changePassword(long userId, String oldPassword, String newPassword) throws ServiceException;

    User recharge(long userId, double amount) throws ServiceException;

    User getUserById(long id) throws ServiceException;

    List<User> search(String username) throws ServiceException;

    User update(long id, String username, String email, String phone, String info) throws ServiceException;

}
