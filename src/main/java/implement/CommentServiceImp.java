package implement;

import bean.CommentResponse;
import entity.Comment;
import exception.ServiceException;

import java.util.List;

public interface CommentServiceImp {
    long add(long itemId, long userId, String content) throws ServiceException;

    boolean delete(long userId,long id) throws ServiceException;

    List<CommentResponse> findByItemId(long itemId) throws ServiceException;

    List<CommentResponse> findByUserId(long userId) throws ServiceException;
}
