package service;

import dao.ItemDao;
import entity.Item;
import enums.ItemStatus;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public class ItemService implements ItemServiceImp {
    private final ItemDao itemDao = new ItemDao();

    @Override
    public long add(long sellerId, String title, String description, double price, String coverImage) throws ServiceException {
        if (sellerId <= 0) {
            throw new ServiceException(400, "Invalid seller id");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new ServiceException(400, "Title is required");
        }
        if (price <= 0) {
            throw new ServiceException(400, "Price must be greater than 0");
        }

        Item item = new Item(sellerId, title.trim(), description == null ? "" : description.trim(), price, 1, coverImage);
        item.setStatus(ItemStatus.ON_SALE);

        try {
            long itemId = itemDao.add(item);
            if (itemId <= 0) {
                throw new ServiceException(500, "Failed to create item");
            }
            return itemId;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void delete(long userId, long itemId) throws ServiceException {
        try {
            Item item = itemDao.findById(itemId);
            if (item == null) {
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
    public void edit(long userId, long itemId, String title, String description, double price, int stock, String status, String coverImage)
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
            if (status != null && !status.trim().isEmpty()) {
                itemDao.updateStatus(itemId, ItemStatus.valueOf(status.trim()));
            }
            if (coverImage != null && !coverImage.trim().isEmpty()) {
                itemDao.updateCoverImage(itemId, coverImage.trim());
            }
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
            if (item == null) {
                throw new ServiceException(404, "Item not found");
            }
            return item;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> findBySeller(long sellerId) throws ServiceException {
        try {
            return itemDao.findBySellerId(sellerId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> findByStatus(ItemStatus status) throws ServiceException {
        try {
            return itemDao.findByStatus(status);
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
            return itemDao.findByTitle(keyword.trim());
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Item> recommend(Long userId) throws ServiceException {
        try {
            return itemDao.findRandomItem(10, userId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public void increaseViewCount(long itemId) throws ServiceException {
        try {
            itemDao.increaseViewCount(itemId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
