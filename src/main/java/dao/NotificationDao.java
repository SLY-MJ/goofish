package dao;

import entity.Notification;
import util.DbUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class NotificationDao {
    public long add(long sender, long receiver, int type, String content)throws SQLException {
        String sql = "insert into notifications(send_id, receive_id, type, content) values(?,?,?,?)";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, sender);
            ps.setLong(2, receiver);
            ps.setInt(3, type);
            ps.setString(4, content);

            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return -1;
    }

    public List<Notification> getNotifications(long sender, long receiver) throws SQLException {
        String sql = "select * from notifications where (send_id = ? and receive_id = ?) or (send_id = ? and receive_id = ?) order by created_at desc";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, sender);
            ps.setLong(2, receiver);
            ps.setLong(3, receiver);
            ps.setLong(4, sender);
            ResultSet rs = ps.executeQuery();
            List<Notification> notifications = new ArrayList<>();
            while (rs.next()) {
                Notification notification = getNotification(rs);
                notifications.add(notification);
            }
            return notifications;
        }
    }

    public List<Long> getConversation(long userId) throws SQLException {
        String sql = """
                SELECT DISTINCT
                  CASE
                    WHEN send_id = ? THEN receive_id
                    ELSE send_id
                    END AS conversation_id
                FROM notifications
                WHERE type = 1
                  AND is_deleted = 0
                  AND (send_id = ? OR receive_id = ?);
                """;
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.setLong(2, userId);
            ps.setLong(3, userId);
            ResultSet rs = ps.executeQuery();
            List<Long> conversations = new ArrayList<>();
            while (rs.next()) {
                conversations.add(rs.getLong("conversation_id"));
            }
            return conversations;
        }
    }

    public List<Notification> findByUserId(long userId, int limit) throws SQLException {
        String sql = "select * from notifications where send_id=? order by id desc limit ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.setInt(2, limit);
            ResultSet rs = ps.executeQuery();
            List<Notification> list = new ArrayList<>();
            while (rs.next()) {
                list.add(getNotification(rs));
            }
            return list;
        }
    }

    public int countUnread(long userId) throws SQLException {
        String sql = "select count(*) from notifications where receive_id=? and is_read=0";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
        }
        return 0;
    }

    public int countUnread(long sender,long receiver) throws SQLException {
        String sql = "select count(*) from notifications where send_id = ? and receive_id = ?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, sender);
            ps.setLong(2, receiver);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
            return 0;
        }
    }

    public void markRead(long id) throws SQLException {
        String sql = "update notifications set is_read=1 where id=?";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, id);
            ps.executeUpdate();
        }
    }

    public void markAllRead(long sender, long receiver) throws SQLException {
        String sql = "update notifications set is_read=1 where send_id=? and receive_id=? and is_read=0";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, sender);
            ps.setLong(2, receiver);
            ps.executeUpdate();
        }
    }

    public void markAllRead(long userId) throws SQLException {
        String sql = "update notifications set is_read=1 where receive_id=? and is_read=0";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.executeUpdate();
        }
    }

    private Notification getNotification(ResultSet rs) throws SQLException {
        return new Notification(
                rs.getLong("id"),
                rs.getLong("send_id"),
                rs.getLong("receive_id"),
                rs.getInt("type"),
                rs.getString("content"),
                rs.getInt("is_read") == 1,
                rs.getTimestamp("created_at")
        );
    }
}
