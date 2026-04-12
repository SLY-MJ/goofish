package service;

import dao.FavoriteDao;
import dao.ItemDao;
import entity.Favorite;
import entity.Item;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FavoriteService implements FavoriteServiceImp {
    private final ItemDao itemDao = new ItemDao();
    private final FavoriteDao favoriteDao = new FavoriteDao();

    @Override
    public void add(long userId, long itemId) throws ServiceException {
        if (userId <= 0 || itemId <= 0) {
            throw new ServiceException(400, "Invalid favorite request");
        }

        try {
            if (favoriteDao.exists(userId, itemId)) {
                return;
            }
            favoriteDao.add(userId, itemId);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void remove(long userId, long itemId) throws ServiceException {
        if (userId <= 0 || itemId <= 0) {
            throw new ServiceException(400, "Invalid favorite request");
        }

        try {
            if (!favoriteDao.exists(userId, itemId)) {
                return;
            }
            favoriteDao.delete(userId, itemId);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> getMyFavorite(long userId) throws ServiceException {
        if (userId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }

        try {
            List<Favorite> favorites = favoriteDao.getByUserId(userId);
            List<Item> items = new ArrayList<>();
            if (favorites == null || favorites.isEmpty()) {
                return items;
            }

            for (Favorite favorite : favorites) {
                try {
                    Item item = itemDao.findById(favorite.getItemId());
                    if (item != null) {
                        items.add(item);
                    }
                } catch (Exception e) {
                    throw new ServiceException(500, e.getMessage());
                }
            }
            return items;
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
