package dao;

import entity.User;
import enums.UserRole;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDao {
    public UserDao() {
    }

    public long add(User user) throws SQLException {
        String sql = "insert into users(username,password_hash,salt,role) values(?,?,?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);//为了能获得新增的主键
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPasswordHash());
            ps.setString(3, user.getSalt());
            ps.setString(4, user.getRole().name());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();//获取新插入的用户
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public void delete(long id) throws SQLException {
        String sql = "update users set status =2 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    public void ban(long id) throws SQLException {
        String sql = "update users set status =0 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    public void restore(long id) throws SQLException {
        String sql = "update users set status =1 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    public User findById(long id) throws SQLException {
        String sql = "select * from users where id=? and status<2";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getUser(rs);
            }
        }
        return null;
    }

    public User findByUsername(String username) throws SQLException {
        String sql = "select * from users where username=? and status<2";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getUser(rs);
            }
        }
        return null;
    }

    public List<User> findByRole(UserRole role) throws SQLException {
        String sql = "select * from users where role =? and status<2";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, role.name());
            ResultSet rs = ps.executeQuery();
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(getUser(rs));
            }
            return users;
        }
    }

    public List<User> findAll() throws SQLException {
        String sql = "select * from users where status<2";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(getUser(rs));
            }
            return users;
        }
    }

    public List<User> search(String username) throws SQLException {
        String sql = "select * from users where username like ?and status<2";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%"+username+"%");
            ResultSet rs = ps.executeQuery();
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(getUser(rs));
            }
            return users;
        }
    }

    //内部方法
    private User getUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setPasswordHash(rs.getString("password_hash"));
        user.setSalt(rs.getString("salt"));
        user.setRole(UserRole.valueOf(rs.getString("role")));
        user.setInformation(rs.getString("information"));
        user.setEmail(rs.getString("email"));
        user.setPhone(rs.getString("phone"));
        user.setWalletBalance(rs.getDouble("wallet_balance"));
        user.setStatus(rs.getInt("status") == 1);
        user.setCreateTime(rs.getString("created_at"));
        user.setUpdateTime(rs.getString("updated_at"));
        return user;
    }

    public void updateUsername(User user) throws SQLException {
        String sql = "update users set username=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, user.getUsername());
            ps.setLong(2, user.getId());
            ps.executeUpdate();
        }
    }

    public void updatePassword(User user) throws SQLException {
        String sql = "update users set password_hash=?,salt=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, user.getPasswordHash());
            ps.setString(2, user.getSalt());
            ps.setLong(3, user.getId());
            ps.executeUpdate();
        }
    }

    public void updateEmail(User user) throws SQLException {
        String sql = "update users set email=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, user.getEmail());
            ps.setLong(2, user.getId());
            ps.executeUpdate();
        }
    }

    public void updatePhone(User user) throws SQLException {
        String sql = "update users set phone=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, user.getPhone());
            ps.setLong(2, user.getId());
            ps.executeUpdate();
        }
    }

    public void updateWalletBalance(User user) throws SQLException {
        String sql = "update users set wallet_balance=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setDouble(1, user.getWalletBalance());
            ps.setLong(2, user.getId());
            ps.executeUpdate();
        }
    }

    public void updateStatus(User user) throws SQLException {
        String sql = "update users set status=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setBoolean(1, user.getStatus());
            ps.setLong(2, user.getId());
            ps.executeUpdate();
        }
    }

    public void updateInformation(User user) throws SQLException {
        String sql = "update users set information=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, user.getInformation());
            ps.setLong(2, user.getId());
            ps.executeUpdate();
        }
    }

    public void update(User user) throws SQLException {
        String sql = "update users set username=?,email=?,phone=?,password_hash=?,salt=?,role=?,information=?,wallet_balance=?,status=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPhone());
            ps.setString(4, user.getPasswordHash());
            ps.setString(5, user.getSalt());
            ps.setString(6, user.getRole().name());
            ps.setString(7, user.getInformation());
            ps.setDouble(8, user.getWalletBalance());
            ps.setBoolean(9, user.getStatus());
            ps.setLong(10, user.getId());
            ps.executeUpdate();
        }
    }
}
