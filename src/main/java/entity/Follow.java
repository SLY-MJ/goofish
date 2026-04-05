package entity;

public class Follow {
    private long id;
    private long followerId;
    private long followedId;
    private String createTime;

    public Follow() {
    }

    public Follow(long followerId, long followedId) {
        this.followerId = followerId;
        this.followedId = followedId;
    }

    public Follow(long id, long followerId, long followeeId, String createTime) {
        this.id = id;
        this.followerId = followerId;
        this.followedId = followeeId;
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

    public long getFollowedId() {
        return followedId;
    }

    public void setFollowedId(long followedId) {
        this.followedId = followedId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
