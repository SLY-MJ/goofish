package dao;

import entity.WalletLog;
import enums.BusinessType;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class WalletLogDao {

    public long add(WalletLog walletLog) throws SQLException {
        String sql = "insert into wallet_logs(user_id,change_amount,balance_after,business_type,business_id,remark) values(?,?,?,?,?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, walletLog.getUserId());
            ps.setDouble(2, walletLog.getChangeAmount());
            ps.setDouble(3, walletLog.getBalanceAfter());
            ps.setString(4, walletLog.getBusinessType().name());
            ps.setLong(5, walletLog.getBusinessId());
            ps.setString(6, walletLog.getRemark());
            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public boolean delete(long id) throws SQLException {
        String sql = "delete from wallet_logs where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
            return true;
        }
    }

    public WalletLog findById(long id) throws SQLException {
        String sql = "select * from wallet_logs where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return getWalletLog(rs);
            }
        }
        return null;
    }

    public List<WalletLog> findByUserId(long userId) throws SQLException {
        String sql = "select * from wallet_logs where user_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ResultSet rs = ps.executeQuery();
            List<WalletLog> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getWalletLog(rs));
            }
            return list;
        }
    }

    public List<WalletLog> findByBusinessType(BusinessType businessType) throws SQLException {
        String sql = "select * from wallet_logs where business_type=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, businessType.name());
            ResultSet rs = ps.executeQuery();
            List<WalletLog> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getWalletLog(rs));
            }
            return list;
        }
    }

    public List<WalletLog> findByBusinessId(long businessId) throws SQLException {
        String sql = "select * from wallet_logs where business_id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, businessId);
            ResultSet rs = ps.executeQuery();
            List<WalletLog> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getWalletLog(rs));
            }
            return list;
        }
    }

    public List<WalletLog> findAll() throws SQLException {
        String sql = "select * from wallet_logs";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<WalletLog> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getWalletLog(rs));
            }
            return list;
        }
    }

    public boolean updateRemark(long id, String remark) throws SQLException {
        String sql = "update wallet_logs set remark=? where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, remark);
            ps.setLong(2, id);
            ps.executeUpdate();
            return true;
        }
    }

    private WalletLog getWalletLog(ResultSet rs) throws SQLException {
        return new WalletLog(
                rs.getLong("id"),
                rs.getLong("user_id"),
                rs.getDouble("change_amount"),
                rs.getDouble("balance_after"),
                BusinessType.valueOf(rs.getString("business_type")),
                rs.getLong("business_id"),
                rs.getString("created_at"),
                rs.getString("remark")
        );
    }
}
