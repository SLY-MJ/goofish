package implement;

import entity.Comment;
import exception.ServiceException;

import java.util.List;

public interface CommentServiceImp {
    long add(long itemId, long userId, String content) throws ServiceException;

    boolean delete(long userId,long id) throws ServiceException;

    List<Comment> findByItemId(long itemId) throws ServiceException;

    List<Comment> findByUserId(long userId) throws ServiceException;
}
