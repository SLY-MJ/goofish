package dao;

import entity.Follow;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FollowDao {

    public long add(Follow follow) throws SQLException {
        String sql = "insert into follows(follower_id,followee_id) values(?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, follow.getFollowerId());
            ps.setLong(2, follow.getFolloweeId());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public boolean delete(long id) throws SQLException {
        String sql = "delete from follows where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }

    public boolean deleteByFollowerAndFollowee(long followerId, long followeeId) throws SQLException {
        String sql = "delete from follows where follower_id=? and followee_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, followerId);
            ps.setLong(2, followeeId);
            ps.executeUpdate();
            return true;
        }
    }

    public boolean exists(long followerId, long followeeId) throws SQLException {
        String sql = "select 1 from follows where follower_id=? and followee_id=? limit 1";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, followerId);
            ps.setLong(2, followeeId);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    public Follow findById(long id) throws SQLException {
        String sql = "select * from follows where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getFollow(rs);
            }
        }
        return null;
    }

    public List<Follow> findByFollowerId(long followerId) throws SQLException {
        String sql = "select * from follows where follower_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, followerId);
            ResultSet rs = ps.executeQuery();
            List<Follow> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getFollow(rs));
            }
            return list;
        }
    }

    public List<Follow> findByFolloweeId(long followeeId) throws SQLException {
        String sql = "select * from follows where followee_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, followeeId);
            ResultSet rs = ps.executeQuery();
            List<Follow> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getFollow(rs));
            }
            return list;
        }
    }

    private Follow getFollow(ResultSet rs) throws SQLException {
        return new Follow(
                rs.getLong("id"),
                rs.getLong("follower_id"),
                rs.getLong("followee_id"),
                rs.getString("created_at")
        );
    }
}
