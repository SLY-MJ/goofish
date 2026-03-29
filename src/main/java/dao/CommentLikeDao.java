package dao;

import entity.CommentLike;
import util.DbUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CommentLikeDao {
    public CommentLikeDao() {
    }

    public long add(CommentLike cl)throws Exception{
        String sql ="insert into comment_likes(comment_id,user_id) values(?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, cl.getCommentId());
            ps.setLong(2, cl.getUserId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
            return -1;
        }
    }

    public boolean delete (CommentLike cl)throws Exception{
        String sql ="delete from comment_likes where id = ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, cl.getId());
            ps.executeUpdate();
            return true;
        }
    }

    private CommentLike getCommentLike(ResultSet rs) throws SQLException {
        return new CommentLike(
                rs.getLong("id"),
                rs.getLong("comment_id"),
                rs.getLong("user_id"),
                rs.getString("created_at")
        );
    }

    public List<CommentLike> findByCommentId(long commentId)throws Exception{
        String sql ="select * from comment_likes where comment_id = ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, commentId);
            ResultSet rs = ps.executeQuery();
            List<CommentLike> list = new ArrayList<>();
            while(rs.next()) {
                list.add(getCommentLike(rs));
            }
            return list;
        }
    }

    public List<CommentLike> findByUserId(long userId)throws Exception{
        String sql ="select * from comment_likes where user_id = ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ResultSet rs = ps.executeQuery();
            List<CommentLike> list = new ArrayList<>();
            while(rs.next()) {
                list.add(getCommentLike(rs));
            }
            return list;
        }
    }

}
