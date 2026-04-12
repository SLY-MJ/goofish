package dao;

import entity.Favorite;
import util.DbUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class FavoriteDao {
    public FavoriteDao() {
    }

    public long add(long userId, long itemId) throws Exception {
        String sql = "insert into favorites(user_id,item_id) values(?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, userId);
            ps.setLong(2, itemId);
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
            return -1;
        }
    }

    public boolean delete(long userId, long itemId) throws Exception {
        String sql = "delete from favorites where user_id=?and item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.setLong(2, itemId);
            ps.executeUpdate();
            return true;
        }
    }

    public boolean exists(long userId, long itemId) throws Exception {
        String sql = "select 1 from favorites where user_id=? and item_id=? limit 1";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.setLong(2, itemId);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    private Favorite getFavorite(ResultSet rs) throws Exception {
        return new Favorite(
                rs.getLong("id"),
                rs.getLong("user_id"),
                rs.getLong("item_id"),
                rs.getString("created_at")
        );
    }

    public List<Favorite> getByUserId(long userId) throws Exception {
        String sql = "select * from favorites where user_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ResultSet rs = ps.executeQuery();
            List<Favorite> favorites = new ArrayList<>();
            while (rs.next()) {
                favorites.add(getFavorite(rs));
            }
            return favorites;
        }
    }

    public List<Favorite> getByItemId(long itemId) throws Exception {
        String sql = "select * from favorites where item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ResultSet rs = ps.executeQuery();
            List<Favorite> favorites = new ArrayList<>();
            while (rs.next()) {
                favorites.add(getFavorite(rs));
            }
            return favorites;
        }
    }
}
