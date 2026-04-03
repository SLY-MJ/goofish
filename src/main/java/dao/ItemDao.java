package dao;

import entity.Item;
import enums.ItemStatus;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ItemDao {
    public ItemDao() {
    }

    public long add(Item item) throws SQLException {
        String sql = "insert into items(seller_id,title,description,price,stock,status,cover_image) values(?,?,?,?,?,?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, item.getSellerId());
            ps.setString(2, item.getTitle());
            ps.setString(3, item.getDescription());
            ps.setDouble(4, item.getPrice());
            ps.setInt(5, item.getStock());
            ps.setString(6, item.getStatus() == null ? ItemStatus.ON_SALE.name() : item.getStatus().name());
            ps.setString(7, item.getCoverImage());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public boolean delete(long id) throws SQLException {
        String sql = "delete from items where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }

    public Item findById(long id) throws SQLException {
        String sql = "select * from items where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getItem(rs);
            }
        }
        return null;
    }

    public List<Item> findAll() throws SQLException {
        String sql = "select * from items";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<Item> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItem(rs));
            }
            return list;
        }
    }

    public List<Item> findBySellerId(long sellerId) throws SQLException {
        String sql = "select * from items where seller_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, sellerId);
            ResultSet rs = ps.executeQuery();
            List<Item> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItem(rs));
            }
            return list;
        }
    }

    public List<Item> findByStatus(ItemStatus status) throws SQLException {
        String sql = "select * from items where status=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, status.name());
            ResultSet rs = ps.executeQuery();
            List<Item> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItem(rs));
            }
            return list;
        }
    }

    //支持模糊查询
    public List<Item> findByTitle(String keyword) throws SQLException {
        String sql = "select * from items where title like ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%" + keyword + "%");
            ResultSet rs = ps.executeQuery();
            List<Item> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItem(rs));
            }
            return list;
        }
    }

    public boolean update(Item item) throws SQLException {
        String sql = "update items set seller_id=?,title=?,description=?,price=?,stock=?,status=?,cover_image=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, item.getSellerId());
            ps.setString(2, item.getTitle());
            ps.setString(3, item.getDescription());
            ps.setDouble(4, item.getPrice());
            ps.setInt(5, item.getStock());
            ps.setString(6, item.getStatus().name());
            ps.setString(7, item.getCoverImage());
            ps.setLong(8, item.getId());
            ps.executeUpdate();
            return true;
        }
    }

    public boolean updateStatus(Item item) throws SQLException {
        String sql = "update items set status=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, item.getStatus().name());
            ps.setLong(2, item.getId());
            ps.executeUpdate();
            return true;
        }
    }

    public boolean updateStock(Item item) throws SQLException {
        String sql = "update items set stock=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, item.getStock());
            ps.setLong(2, item.getId());
            ps.executeUpdate();
            return true;
        }
    }

    public boolean updatePrice(Item item) throws SQLException {
        String sql = "update items set price=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setDouble(1, item.getPrice());
            ps.setLong(2, item.getId());
            ps.executeUpdate();
            return true;
        }
    }

    public boolean updateCoverImage(Item item) throws SQLException {
        String sql = "update items set cover_image=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, item.getCoverImage());
            ps.setLong(2, item.getId());
            ps.executeUpdate();
            return true;
        }
    }

    public boolean updateDescription(Item item) throws SQLException {
        String sql = "update items set description=?  where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, item.getDescription());
            ps.setLong(2, item.getId());
            ps.executeUpdate();
            return true;
        }
    }

    public boolean increaseViewCount(long id) throws SQLException {
        String sql = "update items set view_count=view_count+1 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }

    private Item getItem(ResultSet rs) throws SQLException {
        return new Item(
                rs.getLong("id"),
                rs.getLong("seller_id"),
                rs.getString("title"),
                rs.getString("description"),
                rs.getDouble("price"),
                rs.getInt("stock"),
                ItemStatus.valueOf(rs.getString("status")),
                rs.getString("cover_image"),
                rs.getInt("view_count"),
                rs.getBoolean("is_deleted"),
                rs.getString("created_at"),
                rs.getString("updated_at")
        );
    }

    //随机推荐
    public List<Item> findRandomItem(int limit, Long excludeSellerId) throws SQLException {
        StringBuilder sql = new StringBuilder(
                "select * from items " +
                        "where status=? and is_deleted=0 and stock>0"
        );
        if (excludeSellerId != null) {
            sql.append(" and seller_id<>?");
        }
        sql.append(" order by rand() limit ?");

        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql.toString());
            int idx = 1;
            ps.setString(idx++, ItemStatus.ON_SALE.name());
            if (excludeSellerId != null) {
                ps.setLong(idx++, excludeSellerId);
            }
            ps.setInt(idx, limit);

            ResultSet rs = ps.executeQuery();
            List<Item> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItem(rs));
            }
            return list;
        }
    }

    public List<Item> sortByPrice() throws SQLException {
        String sql = "select * from items order by price";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<Item> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getItem(rs));
            }
            return list;
        }
    }

}
