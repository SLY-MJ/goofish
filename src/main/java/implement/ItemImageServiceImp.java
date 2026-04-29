package implement;

import entity.ItemImage;
import exception.ServiceException;

import java.util.List;

public interface ItemImageServiceImp {
    void add(long itemId, String imageUrl, int sortOrder) throws ServiceException;

    void add(long itemId, List<String> imageUrl) throws ServiceException;

    void delete(long imageId) throws ServiceException;

    void update(long imageId, int sortOrder) throws ServiceException;

    void update(long imageId, String imageUrl) throws ServiceException;

    List<ItemImage> findByItemId(long itemId) throws ServiceException;
}
