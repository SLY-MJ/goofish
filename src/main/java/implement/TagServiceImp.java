package implement;

import entity.Tag;
import exception.ServiceException;

import java.util.List;

public interface TagServiceImp {
    void add(String name) throws ServiceException;

    void delete(long id) throws ServiceException;

    List<Tag> search(String keyword) throws ServiceException;

    List<Tag> show() throws ServiceException;

    void link(long id, long itemId) throws ServiceException;

    void unlink(long id, long itemId) throws ServiceException;
}
