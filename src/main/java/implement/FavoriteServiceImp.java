package implement;

import entity.Item;
import exception.ServiceException;

import java.util.List;

public interface FavoriteServiceImp {
    void add(long userId, long itemId) throws ServiceException;

    void remove(long userId, long itemId) throws ServiceException;

    List<Item> getMyFavorite(long userId) throws ServiceException;
}
