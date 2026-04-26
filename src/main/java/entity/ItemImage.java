package entity;

public class ItemImage {
    private long id;
    private long itemId;
    private String imageUrl;
    private int sortOrder;
    private String createTime;
    private boolean isDeleted;

    public ItemImage() {
    }

    public ItemImage( long itemId, String imageUrl, int sortOrder) {
        this.itemId = itemId;
        this.imageUrl = imageUrl;
        this.sortOrder = sortOrder;
    }

    public ItemImage(long id, long itemId, String imageUrl, int sortOrder, String createTime,boolean isDeleted) {
        this.id = id;
        this.itemId = itemId;
        this.imageUrl = imageUrl;
        this.sortOrder = sortOrder;
        this.createTime = createTime;
        this.isDeleted = isDeleted;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
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

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
