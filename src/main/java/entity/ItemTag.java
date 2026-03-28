package entity;

public class ItemTag {
    private long id;
    private long itemId;
    private long tagId;
    private String createTime;

    public ItemTag() {
    }

    public ItemTag(long itemId, long tagId) {
        this.itemId = itemId;
        this.tagId = tagId;
    }

    public ItemTag(long id, long itemId, long tagId, String createTime) {
        this.id = id;
        this.itemId = itemId;
        this.tagId = tagId;
        this.createTime = createTime;
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

    public long getTagId() {
        return tagId;
    }

    public void setTagId(long tagId) {
        this.tagId = tagId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
