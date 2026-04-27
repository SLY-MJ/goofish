package dao;

import entity.ItemImage;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ItemImageDao {
    public ItemImageDao() {
    }

    public void add(ItemImage itemImage) throws SQLException {
        String sql = "insert into item_images(item_id,image_url,sort_order) values(?,?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemImage.getItemId());
            ps.setString(2, itemImage.getImageUrl());
            ps.setInt(3, itemImage.getSortOrder());
            ps.executeUpdate();
        }
    }

    public void deleteById(long id) throws SQLException {
        String sql = "update item_images set isDeleted=1 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    public void deleteByItemId(long itemId) throws SQLException {
        String sql = "update item_images set isDeleted=1 where item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ps.executeUpdate();
        }
    }

    public ItemImage findById(long id) throws SQLException {
        String sql = "select * from item_images where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getItemImage(rs);
            }
        }
        return null;
    }

    public ItemImage findByItemIdAndOrder(long itemId, int sortOrder) throws SQLException {
        String sql = "select * from item_images where item_id=? and sort_order=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ps.setInt(2, sortOrder);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getItemImage(rs);
            }
            return null;
        }
    }

    public List<ItemImage> findByItemId(long itemId) throws SQLException {
        String sql = "select * from item_images where item_id=? order by sort_order asc,id asc";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ResultSet rs = ps.executeQuery();
            List<ItemImage> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItemImage(rs));
            }
            return list;
        }
    }

    public void update(ItemImage itemImage) throws SQLException {
        String sql = "update item_images set item_id=?,image_url=?,sort_order=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemImage.getItemId());
            ps.setString(2, itemImage.getImageUrl());
            ps.setInt(3, itemImage.getSortOrder());
            ps.setLong(4, itemImage.getId());
            ps.executeUpdate();
        }
    }

    public void updateImageUrl(long id,String url) throws SQLException {
        String sql = "update item_images set image_url=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, url);
            ps.setLong(2, id);
            ps.executeUpdate();
        }
    }

    public void updateSortOrder(long id,int order) throws SQLException {
        String sql = "update item_images set sort_order=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, order);
            ps.setLong(2, id);
            ps.executeUpdate();
        }
    }

    private ItemImage getItemImage(ResultSet rs) throws SQLException {
        return new ItemImage(
                rs.getLong("id"),
                rs.getLong("item_id"),
                rs.getString("image_url"),
                rs.getInt("sort_order"),
                rs.getString("created_at"),
                rs.getInt("isDeleted") == 1
        );
    }
}
