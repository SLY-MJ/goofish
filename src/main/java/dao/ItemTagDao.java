package dao;

import entity.ItemTag;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ItemTagDao {
    public ItemTagDao() {
    }

    public long add(ItemTag itemTag) throws SQLException {
        String sql = "insert into item_tags(item_id,tag_id) values(?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, itemTag.getItemId());
            ps.setLong(2, itemTag.getTagId());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public boolean deleteById(long id) throws SQLException {
        String sql = "delete from item_tags where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }

    public boolean deleteByItemId(long itemId) throws SQLException {
        String sql = "delete from item_tags where item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ps.executeUpdate();
            return true;
        }
    }

    public boolean deleteByItemIdAndTagId(long itemId, long tagId) throws SQLException {
        String sql = "delete from item_tags where item_id=? and tag_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ps.setLong(2, tagId);
            ps.executeUpdate();
            return true;
        }
    }

    public boolean exists(long itemId, long tagId) throws SQLException {
        String sql = "select 1 from item_tags where item_id=? and tag_id=? limit 1";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ps.setLong(2, tagId);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    public List<ItemTag> findByItemId(long itemId) throws SQLException {
        String sql = "select * from item_tags where item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ResultSet rs = ps.executeQuery();
            List<ItemTag> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItemTag(rs));
            }
            return list;
        }
    }

    public List<ItemTag> findByTagId(long tagId) throws SQLException {
        String sql = "select * from item_tags where tag_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, tagId);
            ResultSet rs = ps.executeQuery();
            List<ItemTag> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItemTag(rs));
            }
            return list;
        }
    }

    private ItemTag getItemTag(ResultSet rs) throws SQLException {
        return new ItemTag(
                rs.getLong("id"),
                rs.getLong("item_id"),
                rs.getLong("tag_id"),
                rs.getString("created_at")
        );
    }
}
