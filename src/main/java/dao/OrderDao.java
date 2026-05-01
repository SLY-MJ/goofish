package dao;

import entity.Order;
import enums.OrderStatus;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDao {

    public long add(long itemId,long buyerId,long sellerId,int number,double amount ,OrderStatus status) throws SQLException {
        String sql = "insert into orders(item_id,buyer_id,seller_id,number,amount,status) values(?,?,?,?,?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, itemId);
            ps.setLong(2, buyerId);
            ps.setLong(3, sellerId);
            ps.setInt(4, number);
            ps.setDouble(5, amount);
            ps.setString(6, status.name());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public void delete(long id) throws SQLException {
        String sql = "delete from orders where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    public Order findById(long id) throws SQLException {
        String sql = "select * from orders where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getOrder(rs);
            }
        }
        return null;
    }

    public List<Order> findByBuyerId(long buyerId) throws SQLException {
        String sql = "select * from orders where buyer_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, buyerId);
            ResultSet rs = ps.executeQuery();
            List<Order> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getOrder(rs));
            }
            return list;
        }
    }

    public List<Order> findBySellerId(long sellerId) throws SQLException {
        String sql = "select * from orders where seller_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, sellerId);
            ResultSet rs = ps.executeQuery();
            List<Order> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getOrder(rs));
            }
            return list;
        }
    }

    public List<Order> findByItemId(long itemId) throws SQLException {
        String sql = "select * from orders where item_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, itemId);
            ResultSet rs = ps.executeQuery();
            List<Order> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getOrder(rs));
            }
            return list;
        }
    }



    public List<Order> findAll() throws SQLException {
        String sql = "select * from orders";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<Order> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getOrder(rs));
            }
            return list;
        }
    }



    public void updateStatus(long id, OrderStatus status) throws SQLException {
        String sql = "update orders set status=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, status.name());
            ps.setLong(2, id);
            ps.executeUpdate();
        }
    }

    public void updateNumber(long id, int number) throws SQLException {
        String sql = "update orders set number=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, number);
            ps.setLong(2, id);
            ps.executeUpdate();
        }
    }

    private Order getOrder(ResultSet rs) throws SQLException {
        return new Order(
                rs.getLong("id"),
                rs.getLong("item_id"),
                rs.getLong("buyer_id"),
                rs.getLong("seller_id"),
                rs.getInt("number"),
                rs.getDouble("amount"),
                OrderStatus.valueOf(rs.getString("status")),
                rs.getString("created_at")
        );
    }
}
