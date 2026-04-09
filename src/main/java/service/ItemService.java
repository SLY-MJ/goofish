package service;

import dao.FavoriteDao;
import dao.ItemDao;
import dao.ItemImageDao;
import dao.ItemTagDao;
import entity.Favorite;
import entity.Item;
import enums.ItemStatus;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public class ItemService implements ItemServiceImp{
    private final ItemDao itemDAO = new ItemDao();
    private final FavoriteDao favoriteDAO = new FavoriteDao();
    private final ItemImageDao itemImageDAO = new ItemImageDao();
    private final ItemTagDao itemTagDAO = new ItemTagDao();

    public long add(long id, String title, String description, double price, String coverImage) throws ServiceException {
        Item item = new Item(id, title, description, price, 1, coverImage);
        long itemID;
        try {
            itemID = itemDAO.add(item);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
        if (itemID > 0) {
            return itemID;
        } else {
            throw new ServiceException(500, "添加商品失败");
        }
    }

    public void delete(long userId,long id) throws ServiceException {
        try {
            if (itemDAO.findById(id) == null) {
                throw new ServiceException(404, "商品不存在");
            }
            if (itemDAO.findById(id).getSellerId()!=userId) {
                throw new ServiceException(403, "没有权限删除该商品");
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        try {
            itemDAO.delete(id);
        }catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public void edit(long id, String title, String description, double price, int stock, String status, String coverImage) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "传入商品不存在");
        }
        try {
            if (itemDAO.findById(id) == null) {
                throw new ServiceException(404, "商品不存在");
            }
            if (title != null && !title.isEmpty()) {
                if (!itemDAO.updateTitle(id, title)) {
                    throw new ServiceException(500, "更新商品标题失败");
                }
            }
            if (description != null && !description.isEmpty()) {
                if (!itemDAO.updateDescription(id, description)) {
                    throw new ServiceException(500, "更新商品描述失败");
                }
            }
            if (price > 0) {
                if (!itemDAO.updatePrice(id, price)) {
                    throw new ServiceException(500, "更新商品价格失败");
                }
            }
            if (stock > 0) {
                if (!itemDAO.updateStock(id, stock)) {
                    throw new ServiceException(500, "更新商品库存失败");
                }
            }
            if (status != null && !status.isEmpty()) {
                if (!itemDAO.updateStatus(id, ItemStatus.valueOf(status))) {
                    throw new ServiceException(500, "更新商品状态失败");
                }
            }
            if (coverImage!= null && !coverImage.isEmpty()) {
                if (!itemDAO.updateCoverImage(id, coverImage)) {
                    throw new ServiceException(500, "更新商品封面失败");
                }
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public Item findById(long id) throws Exception {
        Item item = itemDAO.findById(id);
        if (item == null) {
            throw new Exception("商品不存在");
        }
        return item;
    }

    public List<Item> findBySeller(long sellerId) throws ServiceException {
        List<Item> list;
        try {
            list = itemDAO.findBySellerId(sellerId);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
        if (list == null) {
            throw new ServiceException(404, "该卖家没有商品");
        }
        return list;
    }

    public List<Item> findByStatus(ItemStatus status) throws Exception {
        return itemDAO.findByStatus(status);
    }

    public List<Item> search(String keyword) throws ServiceException {
        if (keyword == null || keyword.isEmpty()) {
            throw new ServiceException(401,"搜索关键词不能为空");
        }
        List<Item> list;
        try {
            list = itemDAO.findByTitle(keyword);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
        return list;
    }

    public List<Item> recommend(long userId) throws ServiceException {
        int limit = 10;

        List<Item> items = null;
        try {
            items = itemDAO.findRandomItem(limit, userId);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
        return items;
    }
}
