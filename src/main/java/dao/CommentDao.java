package dao;

import entity.Comment;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CommentDao {
    public CommentDao() {
    }

    public long add(long itemId,long userId,String comment) throws SQLException{
        String sql = "insert into comments(item_id,user_id,comment) values(?,?,?)";
        try (Connection c= DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, itemId);
            ps.setLong(2, userId);
            ps.setString(3, comment);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
            return -1;
        }
    }

    public boolean delete(long id) throws SQLException {
        String sql = "update comments set is_deleted=1 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }
    //内部方法
    private Comment getComment(ResultSet rs) throws SQLException {
        return new Comment(
                rs.getLong("id"),
                rs.getLong("item_id"),
                rs.getLong("user_id"),
                rs.getString("comment"),
                rs.getBoolean("is_deleted"),
                rs.getString("created_at"),
                rs.getString("updated_at")
        );
    }

    public Comment findById(long id) throws SQLException {
        String sql = "select * from comments where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getComment(rs);
            }
        }
        return null;
    }

    public List<Comment> findAll() throws SQLException {
        String sql = "select * from comments";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<Comment> comments = new ArrayList<>();
            while (rs.next()) {
                comments.add(getComment(rs));
            }
            return comments;
        }
    }

    public List<Comment> findByUserId(long userId) throws SQLException {
        String sql = "select * from comments where user_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ResultSet rs = ps.executeQuery();
            List<Comment> comments = new ArrayList<>();
            while (rs.next()) {
                comments.add(getComment(rs));
            }
            return comments;
        }
    }

    public List<Comment> findByItemId(long itemId) throws SQLException {
        String sql = "select * from comments where item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ResultSet rs = ps.executeQuery();
            List<Comment> comments = new ArrayList<>();
            while (rs.next()) {
                comments.add(getComment(rs));
            }
            return comments;
        }
    }

    public boolean update(Comment comment) throws SQLException {
        String sql="update comments set item_id=?,user_id=?,comment=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, comment.getItemId());
            ps.setLong(2, comment.getUserId());
            ps.setString(3, comment.getComment());
            ps.setLong(4, comment.getId());
            ps.executeUpdate();
            return true;
        }
    }
}
