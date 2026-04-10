package service;

import entity.Item;
import enums.ItemStatus;
import exception.ServiceException;

import java.util.List;

public interface ItemServiceImp {
    long add(long id, String title, String description, double price, String coverImage) throws ServiceException;

    void delete(long userId,long id) throws ServiceException;

    void edit(long userId, long id, String title, String description, double price, int stock, String status, String coverImage) throws ServiceException;

    Item findById(long id) throws ServiceException;

    List<Item> findBySeller(long sellerId) throws ServiceException;

    List<Item> findByStatus(ItemStatus status) throws ServiceException;

    List<Item> search(String keyword) throws ServiceException;

    List<Item> recommend(Long userId) throws ServiceException;
}
