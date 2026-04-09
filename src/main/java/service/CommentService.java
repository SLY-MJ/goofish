package service;

import dao.CommentDao;
import entity.Comment;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public class CommentService implements CommentServiceImp {
    private final CommentDao commentDAO = new CommentDao();

    public long add(long itemId, long userId, String content) throws ServiceException {
        long commentID;
        try {
            commentID = commentDAO.add(itemId, userId, content);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
        if (commentID > 0) {
            return commentID;
        } else {
            throw new ServiceException(500, "添加评论失败");
        }
    }

    public boolean delete(long userId,long id) throws ServiceException {
        try {
            if (commentDAO.findById(id) == null) {
                throw new ServiceException(404, "评论不存在");
            }
            if (commentDAO.findById(id).getUserId() != userId) {
                throw new ServiceException(403, "无权删除他人评论");
            }
            return commentDAO.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<Comment> findByItemId(long itemId) throws ServiceException {
        try {
            return commentDAO.findByItemId(itemId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<Comment> findByUserId(long userId) throws ServiceException {
        try {
            return commentDAO.findByUserId(userId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
