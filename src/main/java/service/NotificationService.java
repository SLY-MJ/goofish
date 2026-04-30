package service;

import bean.NotificationResponse;
import dao.NotificationDao;
import dao.UserDao;
import entity.Notification;
import entity.User;
import exception.ServiceException;
import implement.NotificationServiceImp;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class NotificationService implements NotificationServiceImp {
    private final NotificationDao notificationDao = new NotificationDao();
    private final UserDao userDao = new UserDao();

    public record NotificationRecord(long userId, String latestMessage, Timestamp latestTime) {
    }

    @Override
    public void sendSystemNotification(long receiver, String content) throws ServiceException {
        validate(receiver);
        writeMessage(0, receiver, 0, content);
    }

    @Override
    public void sendMessage(long sender, long receiver, String content) throws ServiceException {
        validate(sender, receiver);
        writeMessage(sender, receiver, 1, content);
    }

    @Override
    public List<NotificationResponse> getMyNotifications(long userId) throws ServiceException {
        validate(userId);
        try {
            List<NotificationRecord> conversations = notificationDao.getConversation(userId);
            List<NotificationResponse> responses = new ArrayList<>();
            for (NotificationRecord record : conversations) {
                long id = record.userId;
                User user = userDao.findById(id);
                String username = "";
                if (user != null && user.getStatus()) {
                    username = user.getUsername();
                }
                int count = notificationDao.countUnread(id, userId);
                String content = record.latestMessage;
                Timestamp created = record.latestTime;
                responses.add(new NotificationResponse(id, username, content, created, count));
            }
            return responses;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public List<Notification> getConversationMessages(long sender, long receiver) throws ServiceException {
        validate(sender, receiver);
        try {
            markAllRead(receiver, sender);
            return notificationDao.getNotifications(sender, receiver);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public int getUnreadCount(long userId) throws ServiceException {
        validate(userId);
        try {
            return notificationDao.countUnread(userId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public void markAllRead(long userId) throws ServiceException {
        validate(userId);
        try {
            notificationDao.markAllRead(userId);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    @Override
    public void markAllRead(long sender, long receiver) throws ServiceException {
        validate(sender, receiver);
        try {
            notificationDao.markAllRead(sender, receiver);
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private void validate(long userId) throws ServiceException {
        if (userId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }
    }

    private void validate(long sender, long receiver) throws ServiceException {
        validate(sender);
        validate(receiver);
    }

    private void writeMessage(long sender, long receiver,int type, String content) throws ServiceException {
        try {
            long id = notificationDao.add(sender, receiver, type, content);
            if (id <= 0) {
                throw new ServiceException(500, "Failed to create notification");
            }
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }
}
