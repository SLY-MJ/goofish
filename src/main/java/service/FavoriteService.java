package service;

import dao.FavoriteDao;
import dao.ItemDao;
import dao.UserDao;
import entity.Favorite;
import entity.Item;
import entity.User;
import exception.ServiceException;
import implement.FavoriteServiceImp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FavoriteService implements FavoriteServiceImp {
    private final ItemDao itemDao = new ItemDao();
    private final UserDao userDao = new UserDao();
    private final FavoriteDao favoriteDao = new FavoriteDao();

    @Override
    public void add(long userId, long itemId) throws ServiceException {
        favoriteAvailable(userId, itemId);
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
        favoriteAvailable(userId, itemId);
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
        userAvailable(userId);
        try {
            List<Favorite> favorites = favoriteDao.getByUserId(userId);
            List<Item> items = new ArrayList<>();
            if (favorites == null || favorites.isEmpty()) {
                return null;
            }

            for (Favorite favorite : favorites) {
                try {
                    Item item = itemDao.findById(favorite.getItemId());
                    if(itemAvailable(item.getId())){
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

    private boolean favoriteAvailable(long userId, long itemId) throws ServiceException {
        return userAvailable(userId)&&itemAvailable(itemId);
    }

    private boolean userAvailable(long userId) throws ServiceException {
        if (userId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }
        try {
            User user=userDao.findById(userId);
            if (user==null) {
                throw new ServiceException(400, "Invalid user id");
            }
            if (!user.getStatus()) {
                throw new ServiceException(400, "User is unavailable");
            }
            return true;
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    private boolean itemAvailable(long itemId) throws ServiceException {
        if (itemId <= 0) {
            throw new ServiceException(400, "Invalid favorite request");
        }
        try {
            Item item=itemDao.findById(itemId);
            if (item==null) {
                throw new ServiceException(400, "Invalid item id");
            }
            if (item.isDeleted()) {
                throw new ServiceException(400, "item is unavailable");
            }
            return true;
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }
}
