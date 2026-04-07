package service;

import entity.User;

public interface UserServiceImp {
    User register(String username, String password, String role) throws Exception;

    User login(String username, String password) throws Exception;

    boolean deleteUser(long id) throws Exception;

    User changePassword(long userId, String oldPassword, String newPassword) throws Exception;

    User recharge(long userId, double amount) throws Exception;

    User getUserById(long id) throws Exception;

    User update(long id, String username, String email, String phone, String info) throws Exception;
}
