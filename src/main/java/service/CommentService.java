package service;

import bean.CommentResponse;
import bean.Response;
import dao.CommentDao;
import dao.ItemDao;
import dao.UserDao;
import entity.Comment;
import entity.User;
import exception.ServiceException;
import implement.CommentServiceImp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CommentService implements CommentServiceImp {
    private final CommentDao commentDao = new CommentDao();
    private final UserDao userDao = new UserDao();
    private final ItemDao itemDao = new ItemDao();

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
    public List<CommentResponse> findByItemId(long itemId) throws ServiceException {
        try {
            return toResponse(commentDao.findByItemId(itemId));
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<CommentResponse> findByUserId(long userId) throws ServiceException {
        try {
            return toResponse(commentDao.findByUserId(userId));
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private boolean available(Comment comment) throws ServiceException {
        try {
            return !comment.getIsDeleted() && userDao.findById(comment.getUserId()) != null && itemDao.findById(comment.getItemId()) != null;
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    private List<CommentResponse> toResponse(List<Comment> comments) throws ServiceException {
        try {
            List<CommentResponse> responseList = new ArrayList<>();
            for (Comment comment : comments) {
                if (available(comment)) {
                    User user = userDao.findById(comment.getUserId());
                    responseList.add(CommentResponse.dto(comment, user == null ? null : user.getUsername()));
                }
            }
            return responseList;
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
