package entity;

public class Comment {
    private long id;
    private  long itemId;
    private long userId;
    private String comment;
    public boolean isDeleted;
    public String createTime;
    public String updateTime;

    public Comment() {
    }

    public Comment(long id, long itemId, long userId, String comment, boolean isDeleted, String createTime, String updateTime) {
        this.id = id;
        this.itemId = itemId;
        this.userId = userId;
        this.comment = comment;
        this.isDeleted = isDeleted;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Comment(long itemId, long userId, String comment) {
        this.itemId = itemId;
        this.userId = userId;
        this.comment = comment;
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

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
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
