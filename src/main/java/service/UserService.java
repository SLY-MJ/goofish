package service;

import dao.UserDao;
import entity.User;
import enums.UserRole;
import exception.ServiceException;
import util.PasswordUtil;

import java.sql.SQLException;
import java.util.List;


public class UserService implements UserServiceImp {
    private final UserDao userDAO = new UserDao();

    public User register(String username, String password, String role) throws ServiceException {
        if (username.length() >= 40 || username.isEmpty()) {
            throw new ServiceException(400, "用户名长度必须在1-40之间");
        }
        if (password.length() >= 40 || password.length() <= 8) {
            throw new ServiceException(400, "密码长度必须在8-40之间");
        }
        UserRole userRole;
        if (role == null || role.trim().isEmpty()) {
            userRole = UserRole.USER;
        } else {
            try {
                userRole = UserRole.valueOf(role.trim().toUpperCase());
            } catch (Exception e) {
                throw new ServiceException(400, "无效的角色: " + role);
            }
        }
        try {
            if (userDAO.findByUsername(username) != null) {
                throw new ServiceException(404, "用户名已存在");
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        PasswordUtil.HashSalt hashSalt = PasswordUtil.hash(password);

        User user = new User(username, hashSalt.hash(), hashSalt.salt(), userRole);
        //返回-1表示注册失败
        long id ;
        try {
            id= userDAO.add(user);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (id != -1) {
            user.setId(id);
            return user;
        } else {
            throw new ServiceException(500, "注册失败");
        }
    }

    public User login(String username, String password) throws ServiceException {
        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            throw new ServiceException(400, "用户名和密码不能为空");
        }
        User user ;
        try {
            user=userDAO.findByUsername(username);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (user == null) {
            throw new ServiceException(404, "用户名不存在");
        }
        PasswordUtil.HashSalt hashSalt = new PasswordUtil.HashSalt(user.getPasswordHash(), user.getSalt());
        if (PasswordUtil.verify(password, hashSalt)) {
            return user;
        }
        throw new ServiceException(401, "密码错误");
    }

    public void deleteUser(long id) throws ServiceException {
        try {
            if (userDAO.findById(id) == null) {
                throw new ServiceException(404,"用户不存在");
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        try {
            userDAO.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public User changePassword(long userId, String oldPassword, String newPassword) throws ServiceException {
        User user = null;
        try {
            user = userDAO.findById(userId);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (user == null) {
            throw new ServiceException(404, "用户不存在");
        }
        PasswordUtil.HashSalt hashSalt = new PasswordUtil.HashSalt(user.getPasswordHash(), user.getSalt());
        if (!PasswordUtil.verify(oldPassword, hashSalt)) {
            throw new ServiceException(401,"旧密码错误");
        }
        PasswordUtil.HashSalt newHashSalt = PasswordUtil.hash(newPassword);
        user.setPasswordHash(newHashSalt.hash());
        user.setSalt(newHashSalt.salt());

        try {
            if (userDAO.update(user)) {
                return user;
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        return null;
    }

    public User recharge(long userId, double amount) throws ServiceException {
        try {
            if (userDAO.findById(userId) == null) {
                throw new ServiceException(404,"用户不存在");
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        User user = null;
        try {
            user = userDAO.findById(userId);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        user.setWalletBalance(user.getWalletBalance() + amount);
        try {
            userDAO.update(user);
            return user;
        } catch (Exception e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public User getUserById(long id) throws ServiceException {
        User user = null;
        try {
            user = userDAO.findById(id);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (user == null) {
            throw new ServiceException(404,"用户不存在");
        }
        return user;
    }

    public List<User> search(String username) throws ServiceException {
        try {
            return userDAO.search(username);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public User update(long id, String username, String email, String phone, String info) throws ServiceException {
        User user = null;
        try {
            user = userDAO.findById(id);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (user == null) {
            throw new ServiceException(404,"用户不存在");
        }
        try {
            if (userDAO.findByUsername(username) != null) {
                throw new ServiceException(400,"用户名已存在");
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        if (username != null && !username.isEmpty()) {
            user.setUsername(username);
        }
        if (email != null && !email.isEmpty()) {
            user.setEmail(email);
        }
        if (phone != null && !phone.isEmpty()) {
            user.setPhone(phone);
        }
        if (info != null && !info.isEmpty()) {
            user.setInformation(info);
        }
        try {
            userDAO.update(user);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        return user;
    }
}
