package bean;

import entity.ItemImage;
import exception.ServiceException;

import java.util.ArrayList;
import java.util.List;

public class ImageResponse {
    private long id;
    private String imageUrl;
    private int sortOrder;

    private ImageResponse() {
    }

    public ImageResponse(long id, String imageUrl, int sortOrder) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.sortOrder = sortOrder;
    }

    public static List<ImageResponse> dto(List<ItemImage> itemImages) throws ServiceException {
        List<ImageResponse> imageResponses = new ArrayList<>();
        for (ItemImage itemImage : itemImages) {
            imageResponses.add(dto(itemImage));
        }
        return imageResponses;
    }

    public static ImageResponse dto(ItemImage itemImage) throws ServiceException {
        return new ImageResponse(itemImage.getId(), itemImage.getImageUrl(), itemImage.getSortOrder());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }
}
