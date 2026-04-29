package dao;

import entity.RefreshToken;
import util.DbUtil;

import java.sql.*;

public class RefreshTokenDao {
    public RefreshTokenDao() {
    }

    public void add(long userId, String tokenHash, long expireTime) {
        String sql = "insert into refresh_tokens (user_id,token_hash,expires_at,revoked) values(?,?,?,0)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.setString(2, tokenHash);
            ps.setTimestamp(3, new Timestamp(expireTime));
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void Revoke(String tokenHash) {
        String sql = "update refresh_tokens set revoked=1 where token_hash=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, tokenHash);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void revokeByUserId(long userId) {
        String sql = "update refresh_tokens set revoked=1 where user_id=? and revoked=0";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public RefreshToken findByHash(String Hash) {
        String sql = "select * from refresh_tokens where token_hash=? and revoked=0";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, Hash);
            var rs = ps.executeQuery();
            if (rs.next()) {
                return new RefreshToken(rs.getLong("user_id"), rs.getString("token_hash"), rs.getTimestamp("expires_at").getTime());
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

}
