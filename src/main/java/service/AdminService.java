package service;

import dao.CommentDao;
import dao.ItemDao;
import dao.UserDao;
import entity.User;
import enums.UserRole;
import exception.ServiceException;
import util.PasswordUtil;

import java.sql.SQLException;

public class AdminService implements AdminServiceImp {
    private final UserDao userDAO = new UserDao();
    private final ItemDao itemDAO = new ItemDao();
    private final CommentDao commentDAO = new CommentDao();

    @Override
    public User registerAdmin(long id, String username, String password) throws ServiceException {
        identify(id);
        try {
            if (userDAO.findByUsername(username) != null) {
                throw new ServiceException(404, "用户名已存在");
            }
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
        PasswordUtil.HashSalt hashSalt = PasswordUtil.hash(password);

        User user = new User(username, hashSalt.hash(), hashSalt.salt(), UserRole.ADMIN);
        //返回-1表示注册失败
        long check;
        try {
            check = userDAO.add(user);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
        if (check != -1) {
            user.setId(check);
            return user;
        } else {
            throw new ServiceException(500, "注册失败");
        }
    }

    @Override
    public void deleteComment(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            commentDAO.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteItem(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            itemDAO.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void deleteUser(long adminId, long id) throws ServiceException {
        identify(adminId);
        try {
            userDAO.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private void identify(long id) throws ServiceException {
        try {
            if (userDAO.findById(id).getRole() != UserRole.ADMIN) {
                throw new ServiceException(403, "权限不足");
            }
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
