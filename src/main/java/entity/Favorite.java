package entity;

public class Favorite {
    public long id;
    public long userId;
    public long itemId;
    public long createTime;

    public Favorite() {
    }

    public Favorite(long userId, long itemId) {
        this.userId = userId;
        this.itemId = itemId;
    }

    public Favorite(long id, long userId, long itemId, long createTime) {
        this.id = id;
        this.userId = userId;
        this.itemId = itemId;
        this.createTime = createTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(long createTime) {
        this.createTime = createTime;
    }
}
