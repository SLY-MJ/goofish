package service;

import dao.ItemDao;
import dao.ItemImageDao;
import entity.Item;
import entity.ItemImage;
import enums.ItemStatus;
import exception.ServiceException;
import implement.ItemServiceImp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemService implements ItemServiceImp {
    private final ItemDao itemDao = new ItemDao();
    private final ItemImageDao itemImageDao = new ItemImageDao();

    @Override
    public long submit(long sellerId, String title, String description, double price,int stock) throws ServiceException {
        if (sellerId <= 0) {
            throw new ServiceException(400, "Invalid seller id");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new ServiceException(400, "Title is required");
        }
        if (price <= 0) {
            throw new ServiceException(400, "Price must be greater than 0");
        }
        if (stock <= 0) {
            stock=1;
        }

        Item item = new Item(sellerId, title.trim(), description == null ? "" : description.trim(), price, stock, null);
        item.setStatus(ItemStatus.SUBMITTED);

        try {
            return itemDao.add(item);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void delete(long userId, long itemId) throws ServiceException {
        try {
            Item item = itemDao.findById(itemId);
            if (item == null || isDeleted(item)) {
                throw new ServiceException(404, "Item not found");
            }
            if (item.getSellerId() != userId) {
                throw new ServiceException(403, "No permission to delete this item");
            }
            itemDao.delete(itemId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void edit(long userId, long itemId, String title, String description, double price, int stock)
            throws ServiceException {
        try {
            Item item = itemDao.findById(itemId);
            if (item == null) {
                throw new ServiceException(404, "Item not found");
            }
            if (item.getSellerId() != userId) {
                throw new ServiceException(403, "No permission to edit this item");
            }

            if (title != null && !title.trim().isEmpty()) {
                itemDao.updateTitle(itemId, title.trim());
            }
            if (description != null && !description.trim().isEmpty()) {
                itemDao.updateDescription(itemId, description.trim());
            }
            if (price > 0) {
                itemDao.updatePrice(itemId, price);
            }
            if (stock > 0) {
                itemDao.updateStock(itemId, stock);
            }
            itemDao.updateStatus(itemId,ItemStatus.SUBMITTED);
        } catch (IllegalArgumentException e) {
            throw new ServiceException(400, "Invalid item status");
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public Item findById(long id) throws ServiceException {
        try {
            Item item = itemDao.findById(id);
            if (item == null || isDeleted(item)) {
                throw new ServiceException(404, "Item not found");
            }
            Item normalized = getItem(item);
            if (normalized == null) {
                throw new ServiceException(404, "Item not found");
            }
            return normalized;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> findBySeller(long sellerId) throws ServiceException {
        try {
            return getItems(itemDao.findBySellerId(sellerId));
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> findByStatus(ItemStatus status) throws ServiceException {
        try {
            return getItems(itemDao.findByStatus(status));
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> search(String keyword) throws ServiceException {
        if (keyword == null || keyword.trim().isEmpty()) {
            throw new ServiceException(400, "Search keyword is required");
        }

        try {
            return getItems(itemDao.findByTitle(keyword.trim()));
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> recommend(Long userId) throws ServiceException {
        try {
            return getItems(itemDao.findRandomItem(10, userId));
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void increaseViewCount(long itemId) throws ServiceException {
        try {
            itemDao.increaseViewCount(itemId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private boolean isDeleted(Item item) {
        return item.isDeleted();
    }

    private List<Item> getItems(List<Item> items) throws ServiceException {
        if (items == null) {
            throw new ServiceException(400, "Items list is null");
        }
        List<Item> list = new ArrayList<>();
        for (Item item : items) {
            Item check=getItem(item);
            if (check != null) {
                list.add(check);
            }
        }
        if (list.isEmpty()) {
            throw new ServiceException(404, "No items found");
        }
        return list;
    }

    private Item getItem(Item item) throws ServiceException {
        if (!isDeleted(item)) {
            try {
                ItemImage image = itemImageDao.findByItemIdAndOrder(item.getId(),1);
                if (image != null&&image.getImageUrl()!=null) {
                    item.setCoverImage(image.getImageUrl());
                }
            } catch (SQLException e) {
                throw new ServiceException(500,e.getMessage());
            }
            return item;
        }
        return null;
    }
}
