package dao;

import entity.Notification;
import service.NotificationService;
import util.DbUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class NotificationDao {
    public long add(long sender, long receiver, int type, String content) throws SQLException {
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
        String sql = "select * from notifications where (send_id = ? and receive_id = ?) or (send_id = ? and receive_id = ?) order by created_at asc";
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

    public List<NotificationService.NotificationRecord> getConversation(long userId) throws SQLException {
        String sql = """
                  SELECT
                    latest.conversation_id,
                    n.content AS last_content,
                    n.created_at AS last_time
                FROM notifications n
                JOIN (
                    SELECT
                        CASE
                            WHEN send_id = ? THEN receive_id
                            ELSE send_id
                        END AS conversation_id,
                        MAX(id) AS last_id
                    FROM notifications
                    WHERE type = 1
                      AND is_deleted = 0
                      AND (send_id = ? OR receive_id = ?)
                    GROUP BY conversation_id
                ) latest ON n.id = latest.last_id
                ORDER BY n.created_at DESC""";
        try (Connection c = DbUtil.getConnection()) {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setLong(1, userId);
            ps.setLong(2, userId);
            ps.setLong(3, userId);
            ResultSet rs = ps.executeQuery();
            List<NotificationService.NotificationRecord> conversations = new ArrayList<>();
            while (rs.next()) {
                long id = rs.getLong(1);
                String content = rs.getString(2);
                Timestamp created = rs.getTimestamp(3);
                conversations.add(new NotificationService.NotificationRecord(id, content, created));
            }
            return conversations;
        }
    }

    public int countUnread(long userId) throws SQLException {
        String sql = "select count(*) from notifications where receive_id=? and is_read=0 and is_deleted=0";
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

    public int countUnread(long sender, long receiver) throws SQLException {
        String sql = "select count(*) from notifications where send_id = ? and receive_id = ?and is_read =0 and is_deleted=0";
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
