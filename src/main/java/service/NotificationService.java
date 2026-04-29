package service;

import bean.NotificationResponse;
import dao.NotificationDao;
import dao.UserDao;
import entity.Notification;
import entity.User;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class NotificationService {
    private static final int DEFAULT_LIMIT = 100;
    private final NotificationDao notificationDao = new NotificationDao();
    private final UserDao userDao = new UserDao();

    public void sendSystemNotification(long receiver, String content)throws ServiceException {
        validate(receiver);
        try {
            long id = notificationDao.add(0, receiver, 0, content);
            if (id <= 0) {
                throw new ServiceException(500, "Failed to create notification");
            }
        }catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public void sendMessage(long sender,long receiver, String content)throws ServiceException {
        validate(sender, receiver);
        try{
            long id=notificationDao.add(sender, receiver, 1, content);
            if (id <= 0) {
                throw new ServiceException(500, "Failed to create notification");
            }
        }catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<NotificationResponse> getMyNotifications(long userId) throws ServiceException {
        validate(userId);
        try {
            List<Long> conversations=notificationDao.getConversation(userId);
            List<NotificationResponse> responses=new ArrayList<>();
            for(Long conversationId:conversations){
                User user=userDao.findById(conversationId);
                String username = "";
                if (user != null&& user.getStatus()) {
                    username=user.getUsername();
                }
                int count=notificationDao.countUnread(conversationId,userId);
                responses.add(new NotificationResponse(conversationId,username,count));
            }
            return responses;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<Notification> getConversationMessages(long sender,long receiver) throws ServiceException {
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

    public void markAllRead(long sender,long receiver) throws ServiceException {
        validate(sender, receiver);
        try {
            notificationDao.markAllRead(sender,receiver);
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
}
