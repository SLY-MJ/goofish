package service;

import entity.Item;
import enums.ItemStatus;
import exception.ServiceException;

import java.util.List;

public interface ItemServiceImp {
    long add(long id, String title, String description, double price, String coverImage) throws ServiceException;

    void delete(long id) throws ServiceException;

    void edit(long id, String title, String description, double price, int stock, String status, String coverImage) throws ServiceException;

    Item findById(long id) throws Exception;

    List<Item> findBySeller(long sellerId) throws ServiceException;

    List<Item> findByStatus(ItemStatus status) throws Exception;

    List<Item> search(String keyword) throws ServiceException;

    List<Item> recommend(long userId) throws ServiceException;
}
