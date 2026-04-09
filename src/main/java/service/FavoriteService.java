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
    public void add(long userId,long itemId) throws ServiceException {
        if (userId <= 0||itemId <= 0) {
            throw new ServiceException(401, "传入用户或商品不存在");
        }
        try{
            favoriteDao.add(userId,itemId);
        }catch (Exception e){
            throw new ServiceException(500, e.getMessage());
        }
    }

    public void remove(long userId,long itemId) throws ServiceException {
        if (userId <= 0||itemId <= 0) {
            throw new ServiceException(401, "传入用户或商品不存在");
        }
        try{
            favoriteDao.delete(userId,itemId);
        }catch (Exception e){
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<Item> getMyFavorite(long userId) throws ServiceException {
        if(userId <= 0){
            throw new ServiceException(401, "传入用户不存在");
        }
        List<Favorite> list;
        try{
            list=favoriteDao.getByUserId(userId);
        }catch (Exception e){
            throw new ServiceException(500, e.getMessage());
        }
        if (list == null || list.isEmpty()) {
            throw new ServiceException(404, "没有收藏的商品");
        }
        List<Item> items = new ArrayList<>();
        for(Favorite favorite : list){
            Item item;
            try {
                item=itemDao.findById(favorite.getItemId());
            } catch (SQLException e) {
                throw new ServiceException(500,e.getMessage());
            }
            items.add(item);
        }
        return items;
    }
}
