package bean;

import entity.Comment;

import java.util.ArrayList;
import java.util.List;

public class CommentResponse {
    private long id;
    private String userId;
    private String username;
    private String commentId;
    private String comment;

    public static CommentResponse dto(Comment comment) {
        return dto(comment, null);
    }

    public static CommentResponse dto(Comment comment, String username) {
        if (comment == null) {
            return null;
        }
        return new CommentResponse(comment.getId(), String.valueOf(comment.getUserId()),
                username, String.valueOf(comment.getItemId()), comment.getComment());
    }

    public static List<CommentResponse> dto(List<Comment> comments) {
        if (comments == null) {
            return null;
        }
        List<CommentResponse> list = new ArrayList<>();
        for (entity.Comment comment : comments) {
            list.add(dto(comment));
        }
        return list;
    }

    public CommentResponse() {
    }

    public CommentResponse(long id, String userId, String username, String commentId, String comment) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.commentId = commentId;
        this.comment = comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
