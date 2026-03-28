package entity;

import enums.ItemStatus;

public class Item {
    private long id;
    private long sellerId;
    private String title;
    private String description;
    private double price;
    private int stock;//库存 默认1
    private ItemStatus status; // 枚举类"ON_SALE", "SOLD", "OFF_SHELF"
    private String coverImage;
    private int viewCount;
    private boolean isDeleted;
    private String createTime;
    private String updateTime;

    public Item() {
    }

    public Item(long sellerId, String title, String description, double price, int stock, String coverImage) {
        this.sellerId = sellerId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.coverImage = coverImage;
    }

    public Item(long id, long sellerId, String title, String description, double price, int stock, ItemStatus status,
                String coverImage, int viewCount, boolean isDeleted, String createTime, String updateTime) {
        this.id = id;
        this.sellerId = sellerId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.status = status;
        this.coverImage = coverImage;
        this.viewCount = viewCount;
        this.isDeleted = isDeleted;
        this.createTime = createTime;
        this.updateTime = updateTime;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}
