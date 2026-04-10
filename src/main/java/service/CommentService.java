package service;

import dao.CommentDao;
import entity.Comment;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public class CommentService implements CommentServiceImp {
    private final CommentDao commentDao = new CommentDao();

    @Override
    public long add(long itemId, long userId, String content) throws ServiceException {
        if (itemId <= 0 || userId <= 0) {
            throw new ServiceException(400, "Invalid comment request");
        }
        if (content == null || content.trim().isEmpty()) {
            throw new ServiceException(400, "Comment content is required");
        }

        try {
            long commentId = commentDao.add(itemId, userId, content.trim());
            if (commentId <= 0) {
                throw new ServiceException(500, "Failed to create comment");
            }
            return commentId;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public boolean delete(long userId, long id) throws ServiceException {
        try {
            Comment comment = commentDao.findById(id);
            if (comment == null) {
                throw new ServiceException(404, "Comment not found");
            }
            if (comment.getUserId() != userId) {
                throw new ServiceException(403, "No permission to delete this comment");
            }
            return commentDao.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Comment> findByItemId(long itemId) throws ServiceException {
        try {
            return commentDao.findByItemId(itemId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Comment> findByUserId(long userId) throws ServiceException {
        try {
            return commentDao.findByUserId(userId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
