package service;

import dao.UserDao;
import entity.User;
import enums.UserRole;
import exception.ServiceException;
import util.PasswordUtil;

import java.sql.SQLException;
import java.util.List;

public class UserService implements UserServiceImp {
    private final UserDao userDao = new UserDao();

    @Override
    public User register(String username, String password) throws ServiceException {
        validateUsername(username);
        validatePassword(password);

        try {
            if (userDao.findByUsername(username) != null) {
                throw new ServiceException(400, "Username already exists");
            }

            PasswordUtil.HashSalt hashSalt = PasswordUtil.hash(password);
            User user = new User(username, hashSalt.hash(), hashSalt.salt(), UserRole.USER);
            long id = userDao.add(user);
            if (id <= 0) {
                throw new ServiceException(500, "Failed to register user");
            }
            user.setId(id);
            return user;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public User login(String username, String password) throws ServiceException {
        if (isBlank(username) || isBlank(password)) {
            throw new ServiceException(400, "Username and password are required");
        }

        try {
            User user = userDao.findByUsername(username);
            if (user == null) {
                throw new ServiceException(404, "User not found");
            }
            PasswordUtil.HashSalt hashSalt = new PasswordUtil.HashSalt(user.getPasswordHash(), user.getSalt());
            if (!PasswordUtil.verify(password, hashSalt)) {
                throw new ServiceException(401, "Invalid password");
            }
            return user;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteUser(long id) throws ServiceException {
        User user = getUserById(id);
        if (user == null) {
            throw new ServiceException(404, "User not found");
        }

        try {
            userDao.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public User changePassword(long userId, String oldPassword, String newPassword) throws ServiceException {
        validatePassword(newPassword);

        User user = getUserById(userId);
        PasswordUtil.HashSalt currentHash = new PasswordUtil.HashSalt(user.getPasswordHash(), user.getSalt());
        if (!PasswordUtil.verify(oldPassword, currentHash)) {
            throw new ServiceException(401, "Old password is incorrect");
        }

        PasswordUtil.HashSalt newHash = PasswordUtil.hash(newPassword);
        user.setPasswordHash(newHash.hash());
        user.setSalt(newHash.salt());

        try {
            userDao.updatePassword(user);
            return user;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public User recharge(long userId, double amount) throws ServiceException {
        if (amount <= 0) {
            throw new ServiceException(400, "Recharge amount must be greater than 0");
        }

        User user = getUserById(userId);
        user.setWalletBalance(user.getWalletBalance() + amount);

        try {
            userDao.updateWalletBalance(user);
            return user;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public User getUserById(long id) throws ServiceException {
        try {
            User user = userDao.findById(id);
            if (user == null) {
                throw new ServiceException(404, "User not found");
            }
            return user;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<User> search(String username) throws ServiceException {
        try {
            return userDao.search(username == null ? "" : username.trim());
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public User update(long id, String username, String email, String phone, String info) throws ServiceException {
        User user = getUserById(id);

        if (!isBlank(username)) {
            try {
                User existing = userDao.findByUsername(username);
                if (existing != null && existing.getId() != id) {
                    throw new ServiceException(400, "Username already exists");
                }
            } catch (SQLException e) {
                throw new ServiceException(500, e.getMessage());
            }
            user.setUsername(username.trim());
        }
        if (!isBlank(email)) {
            user.setEmail(email.trim());
        }
        if (!isBlank(phone)) {
            user.setPhone(phone.trim());
        }
        if (!isBlank(info)) {
            user.setInformation(info.trim());
        }

        try {
            userDao.update(user);
            return user;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private void validateUsername(String username) throws ServiceException {
        if (isBlank(username) || username.length() > 40) {
            throw new ServiceException(400, "Username length must be between 1 and 40");
        }
    }

    private void validatePassword(String password) throws ServiceException {
        if (isBlank(password) || password.length() < 6 || password.length() > 40) {
            throw new ServiceException(400, "Password length must be between 6 and 40");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
