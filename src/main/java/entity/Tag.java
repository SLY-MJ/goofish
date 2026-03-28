package entity;

public class Tag {
    private long id;
    private String name;
    private String createTime;

    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    public Tag(String name, long id, String createTime) {
        this.name = name;
        this.id = id;
        this.createTime = createTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
