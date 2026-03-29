package dao;

import entity.Tag;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TagDao {
    public TagDao() {
    }

    public long add(Tag tag) throws SQLException {
        String sql = "insert into tags(name) values(?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, tag.getName());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public boolean delete(long id) throws SQLException {
        String sql = "delete from tags where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }

    public Tag findById(long id) throws SQLException {
        String sql = "select * from tags where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getTag(rs);
            }
        }
        return null;
    }

    public Tag findByName(String name) throws SQLException {
        String sql = "select * from tags where name=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getTag(rs);
            }
        }
        return null;
    }

    //模糊查询
    public List<Tag> searchByName(String keyword) throws SQLException {
        String sql = "select * from tags where name like ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%" + keyword + "%");
            ResultSet rs = ps.executeQuery();
            List<Tag> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getTag(rs));
            }
            return list;
        }
    }

    public List<Tag> findAll() throws SQLException {
        String sql = "select * from tags";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<Tag> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getTag(rs));
            }
            return list;
        }
    }

    public boolean update(Tag tag) throws SQLException {
        String sql = "update tags set name=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, tag.getName());
            ps.setLong(2, tag.getId());
            ps.executeUpdate();
            return true;
        }
    }

    private Tag getTag(ResultSet rs) throws SQLException {
        return new Tag(
                rs.getString("name"),
                rs.getLong("id"),
                rs.getString("created_at")
        );
    }
}
