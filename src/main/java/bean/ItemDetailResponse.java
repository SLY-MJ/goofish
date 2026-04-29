package bean;

import entity.Item;
import entity.ItemImage;
import entity.User;
import enums.ItemStatus;
import exception.ServiceException;

import java.util.ArrayList;
import java.util.List;

public class ItemDetailResponse {
    private long id;
    private long sellerId;
    private String sellerUsername;
    private String title;
    private String description;
    private double price;
    private int stock;
    private ItemStatus status;
    private String coverImage;
    private int viewCount;
    private List<ImageResponse> images;

    public static ItemDetailResponse dto(Item item, User seller,List<ItemImage> images) throws ServiceException {
        if (item == null) {
            return null;
        }
        return new ItemDetailResponse(
                item.getId(),
                item.getSellerId(),
                seller == null ? null : seller.getUsername(),
                item.getTitle(),
                item.getDescription(),
                item.getPrice(),
                item.getStock(),
                item.getStatus(),
                item.getCoverImage(),
                item.getViewCount(),
                ImageResponse.dto(images)
        );
    }

    public ItemDetailResponse() {
    }

    public ItemDetailResponse(long id, long sellerId, String sellerUsername, String title, String description,
                              double price, int stock, ItemStatus status, String coverImage, int viewCount, List<ImageResponse> images) {
        this.id = id;
        this.sellerId = sellerId;
        this.sellerUsername = sellerUsername;
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.status = status;
        this.coverImage = coverImage;
        this.viewCount = viewCount;
        this.images = images;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSellerId() {
        return sellerId;
    }

    public void setSellerId(long sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerUsername() {
        return sellerUsername;
    }

    public void setSellerUsername(String sellerUsername) {
        this.sellerUsername = sellerUsername;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public List<ImageResponse> getImages() {
        return images;
    }

    public void setImages(List<ImageResponse> images) {
        this.images = images;
    }
}
