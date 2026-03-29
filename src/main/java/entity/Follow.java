package entity;

public class Follow {
    private long id;
    private long followerId;
    private long followeeId;
    private String createTime;

    public Follow() {
    }

    public Follow(long followerId, long followeeId) {
        this.followerId = followerId;
        this.followeeId = followeeId;
    }

    public Follow(long id, long followerId, long followeeId, String createTime) {
        this.id = id;
        this.followerId = followerId;
        this.followeeId = followeeId;
        this.createTime = createTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getFollowerId() {
        return followerId;
    }

    public void setFollowerId(long followerId) {
        this.followerId = followerId;
    }

    public long getFolloweeId() {
        return followeeId;
    }

    public void setFolloweeId(long followeeId) {
        this.followeeId = followeeId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
