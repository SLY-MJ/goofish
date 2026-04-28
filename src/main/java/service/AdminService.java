package service;

import dao.CommentDao;
import dao.ItemDao;
import dao.UserDao;
import entity.Item;
import entity.User;
import enums.ItemStatus;
import enums.UserRole;
import exception.ServiceException;
import implement.AdminServiceImp;
import util.PasswordUtil;

import java.sql.SQLException;
import java.util.List;

public class AdminService implements AdminServiceImp {
    private final UserDao userDao = new UserDao();
    private final ItemDao itemDao = new ItemDao();
    private final CommentDao commentDao = new CommentDao();

    @Override
    public User registerAdmin(long id, String username, String password) throws ServiceException {
        identify(id);
        if (username == null || username.trim().isEmpty()) {
            throw new ServiceException(400, "Username is required");
        }
        if (password == null || password.length() < 6) {
            throw new ServiceException(400, "Password length must be at least 6");
        }

        try {
            if (userDao.findByUsername(username.trim()) != null) {
                throw new ServiceException(400, "Username already exists");
            }
            PasswordUtil.HashSalt hashSalt = PasswordUtil.hash(password);
            User user = new User(username.trim(), hashSalt.hash(), hashSalt.salt(), UserRole.ADMIN);
            long adminId = userDao.add(user);
            if (adminId <= 0) {
                throw new ServiceException(500, "Failed to create admin");
            }
            user.setId(adminId);
            return user;
        } catch (ServiceException e) {
            throw e;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteComment(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            commentDao.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteItem(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            itemDao.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void banUser(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            userDao.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void unBanUser(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            userDao.restore(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void approveItem(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            itemDao.updateStatus(id, ItemStatus.ON_SALE);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void rejectItem(long adminId, long id,String reason) throws ServiceException {
        identify(adminId);
        try {
            itemDao.updateStatus(id, ItemStatus.REJECTED);
            itemDao.updateReason(id, reason);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> getPendingItems(long adminId) throws ServiceException {
        identify(adminId);
        try {
            return itemDao.findByStatus(ItemStatus.SUBMITTED);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> getAllItems(long adminId) throws ServiceException {
        identify(adminId);
        try {
            return itemDao.findAll();
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<User> getAllUsers(long adminId) throws ServiceException {
        identify(adminId);
        try {
            return userDao.findAll();
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private void identify(long id) throws ServiceException {
        try {
            User user = userDao.findById(id);
            if (user == null) {
                throw new ServiceException(404, "User not found");
            }
            if (user.getRole() != UserRole.ADMIN) {
                throw new ServiceException(403, "Admin permission required");
            }
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
