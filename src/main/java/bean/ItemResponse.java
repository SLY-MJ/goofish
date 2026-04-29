package bean;

import entity.Item;
import enums.ItemStatus;

import java.util.ArrayList;
import java.util.List;

public class ItemResponse {
    private long id;
    private long sellerId;
    private String title;
    private String coverImage;
    private double price;
    private ItemStatus status;
    private String reason;

    public static ItemResponse dto(Item item) {
        if (item == null) {
            return null;
        }
        return new ItemResponse(item.getId(), item.getSellerId(), item.getTitle(),
                item.getCoverImage(), item.getPrice(), item.getStatus(), item.getReason());
    }

    public static List<ItemResponse> dto(List<Item> items) {
        if (items == null) {
            return null;
        }
        List<ItemResponse> itemResponseList = new ArrayList<>();
        for (Item item : items) {
            itemResponseList.add(dto(item));
        }
        return itemResponseList;
    }

    public ItemResponse() {
    }

    public ItemResponse(long id, long sellerId, String title, String coverImage, double price, ItemStatus status, String reason) {
        this.id = id;
        this.sellerId = sellerId;
        this.title = title;
        this.coverImage = coverImage;
        this.price = price;
        this.status = status;
        this.reason = reason;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String imgUrl) {
        this.coverImage = imgUrl;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
