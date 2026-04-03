package service;

import dao.ItemDao;
import dao.ItemImageDao;
import dao.ItemTagDao;
import entity.Item;
import enums.ItemStatus;

import java.sql.SQLException;
import java.util.List;

public class ItemService {
    private final ItemDao itemDAO = new ItemDao();
    private final ItemImageDao itemImageDAO = new ItemImageDao();
    private final ItemTagDao itemTagDAO = new ItemTagDao();

    public Item add(Item item) throws Exception {
        if (item == null) {
            throw new Exception("商品不存在");
        }
        long id = itemDAO.add(item);
        if (id > 0) {
            return itemDAO.findById(id);
        } else {
            throw new Exception("添加商品失败");
        }
    }

    public boolean delete(long id) throws Exception {
        if (itemDAO.findById(id) == null) {
            throw new Exception("商品不存在");
        }
        return itemDAO.delete(id);
    }

    public Item edit(Item item) throws Exception {
        if (item == null) {
            throw new Exception("商品不存在");
        }
        if (itemDAO.findById(item.getId()) == null) {
            throw new Exception("商品不存在");
        }
        if (itemDAO.update(item)) {
            return itemDAO.findById(item.getId());
        } else {
            throw new Exception("更新商品失败");
        }
    }

    public Item findById(long id) throws Exception {
        Item item = itemDAO.findById(id);
        if (item == null) {
            throw new Exception("商品不存在");
        }
        return item;
    }

    public List<Item> findBySeller(long sellerId) throws Exception {
        return itemDAO.findBySellerId(sellerId);
    }

    public List<Item> search(String keyword) throws Exception {
        if (keyword == null || keyword.isEmpty()) {
            throw new Exception("搜索关键词不能为空");
        }
        return itemDAO.findByTitle(keyword);
    }

    public List<Item> recommend(long userId) throws Exception {
        int limit = 10;

        List<Item> items = null;
        try {
            items = itemDAO.findRandomItem(limit, userId);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return items;
    }

    public List<Item> findByStatus(ItemStatus status) throws Exception {
        return itemDAO.findByStatus(status);
    }


}
