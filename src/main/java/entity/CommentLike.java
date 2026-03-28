package entity;

public class CommentLike {
    private long id;
    private long commentId;
    private long userId;
    private String createTime;

    public CommentLike() {
    }

    public CommentLike(long id, long commentId, long userId, String createTime) {
        this.id = id;
        this.commentId = commentId;
        this.userId = userId;
        this.createTime = createTime;
    }
    //注册时使用
    public CommentLike(long commentId, long userId) {
        this.commentId = commentId;
        this.userId = userId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCommentId() {
        return commentId;
    }

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
