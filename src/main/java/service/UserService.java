package service;

import dao.UserDao;
import entity.User;
import enums.UserRole;
import util.PasswordUtil;


public class UserService {
    private final UserDao userDAO = new UserDao();

    public long register(String username, String password, UserRole role) throws Exception {
        if (username.length() >= 40 || username.isEmpty()) {
            throw new Exception("用户名长度必须在1-40之间");
        }
        if (password.length() >= 40 || password.length() <= 8) {
            throw new Exception("密码长度必须在8-40之间");
        }
        if (userDAO.findByUsername(username) != null) {
            throw new Exception("用户名已存在");
        }
        PasswordUtil.HashSalt hashSalt = PasswordUtil.hash(password);

        User user = new User(username, hashSalt.hash(), hashSalt.salt(), role);
        //返回-1表示注册失败
        return userDAO.add(user);
    }

    public User login(String username, String password) throws Exception {
        User user = userDAO.findByUsername(username);
        if (user == null) {
            throw new Exception("用户名不存在");
        }
        PasswordUtil.HashSalt hashSalt = new PasswordUtil.HashSalt(user.getPasswordHash(), user.getSalt());
        if (PasswordUtil.verify(password, hashSalt)) {
            return user;
        }
        return null;
    }

    public boolean deleteUser(long id) throws Exception {
        if (userDAO.findById(id) == null) {
            throw new Exception("用户不存在");
        }
        return userDAO.delete(id);
    }

    public boolean updateUser(User user) throws Exception {
        if (userDAO.findById(user.getId()) == null) {
            throw new Exception("用户不存在");
        }
        return userDAO.update(user);
    }

    public User changePassword(long userId, String oldPassword, String newPassword) throws Exception {
        User user = userDAO.findById(userId);
        if (user == null) {
            throw new Exception("用户不存在");
        }
        PasswordUtil.HashSalt hashSalt = new PasswordUtil.HashSalt(user.getPasswordHash(), user.getSalt());
        if (!PasswordUtil.verify(oldPassword, hashSalt)) {
            throw new Exception("旧密码错误");
        }
        PasswordUtil.HashSalt newHashSalt = PasswordUtil.hash(newPassword);
        user.setPasswordHash(newHashSalt.hash());
        user.setSalt(newHashSalt.salt());

        if (userDAO.update(user)){
            return user;
        }
        return null;
    }

    public boolean recharge(long userId, double amount) throws Exception {
        if (userDAO.findById(userId) == null) {
            throw new Exception("用户不存在");
        }
        User user = userDAO.findById(userId);
        user.setWalletBalance(user.getWalletBalance() + amount);
        try {
            userDAO.update(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
