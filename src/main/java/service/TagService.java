package service;

import dao.ItemTagDao;
import dao.TagDao;
import entity.Tag;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.List;

public class TagService implements TagServiceImp {
    private final TagDao tagDao = new TagDao();
    private final ItemTagDao itemTagDao = new ItemTagDao();
    public void add(String name) throws ServiceException {
        if (name == null|| name.isEmpty()) {
            throw new ServiceException(401, "标签名不能为空");
        }
        try{
            tagDao.add(name);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public void delete(long id) throws ServiceException {
        if (id <= 0) {
            throw new ServiceException(401, "传入标签不存在");
        }
        try{
            tagDao.delete(id);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public List<Tag> search(String keyword) throws ServiceException {
        if (keyword == null || keyword.isEmpty()) {
            throw new ServiceException(401, "搜索关键词不能为空");
        }
        List<Tag> tags;
        try{
            tags=tagDao.searchByName(keyword);
        }catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        return tags;
    }

    public List<Tag> show() throws ServiceException {
        List<Tag> tags;
        try {
            tags=tagDao.findAll();
        }catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
        return tags;
    }

    public void link(long id,long itemId) throws ServiceException {
        if (id <= 0||itemId <= 0) {
            throw new ServiceException(401, "传入标签或商品不存在");
        }
        try{
            itemTagDao.add(itemId,id);
        }catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    public void unlink(long id,long itemId) throws ServiceException {
        if (id <= 0||itemId <= 0) {
            throw new ServiceException(401, "传入标签或商品不存在");
        }
        try{
            itemTagDao.deleteByItemIdAndTagId(itemId,id);
        }catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }
}
