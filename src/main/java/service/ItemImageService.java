package service;

import entity.ItemImage;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemImageService implements implement.ItemImageServiceImp {
    private final dao.ItemImageDao itemImageDao = new dao.ItemImageDao();

    @Override
    public void add(long itemId, String imageUrl, int sortOrder) throws ServiceException {
        try {
            itemImageDao.add(itemId,imageUrl,sortOrder);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    @Override
    public void add(long itemId,List<String> imageUrls) throws ServiceException {
        try {
            if (imageUrls != null && !imageUrls.isEmpty()) {
                int i=1;
                for(String Url:imageUrls){
                    if (Url == null) {
                        continue;
                    }
                    String normalizedUrl = Url.trim();
                    if (normalizedUrl.isEmpty()) {
                        continue;
                    }
                    itemImageDao.add(itemId,normalizedUrl,i++);
                }
            }
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    @Override
    public void delete(long imageId) throws ServiceException {
        try {
            ItemImage check=itemImageDao.findById(imageId);
            long itemId=check.getItemId();
            int order=check.getSortOrder();
            List<ItemImage> images=itemImageDao.findByItemId(itemId);
            for(ItemImage img:images){
                if(img.getSortOrder()>order){
                    itemImageDao.updateSortOrder(img.getId(), img.getSortOrder()-1);
                }
            }
            itemImageDao.deleteById(imageId);
        } catch (Exception e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    @Override
    public void update(long imageId, int sortOrder) throws ServiceException {
        try {
            ItemImage img=itemImageDao.findById(imageId);
            long itemId=img.getItemId();
            ItemImage check=itemImageDao.findByItemIdAndOrder(itemId,sortOrder);
            if (check!=null){
                itemImageDao.updateSortOrder(check.getId(), img.getSortOrder());
            }
            itemImageDao.updateSortOrder(imageId, sortOrder);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }

    @Override
    public void update(long imageId, String imageUrl) throws ServiceException {
        try {
            itemImageDao.updateImageUrl(imageId, imageUrl);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }


    @Override
    public List<ItemImage> findByItemId(long itemId) throws ServiceException {
        try {
            return itemImageDao.findByItemId(itemId);
        } catch (SQLException e) {
            throw new ServiceException(500,e.getMessage());
        }
    }
}
