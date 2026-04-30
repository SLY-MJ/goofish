package implement;

import bean.NotificationResponse;
import entity.Notification;
import exception.ServiceException;

import java.util.List;

public interface NotificationServiceImp {
    void sendSystemNotification(long receiver, String content) throws ServiceException;

    void sendMessage(long sender, long receiver, String content) throws ServiceException;

    List<NotificationResponse> getMyNotifications(long userId) throws ServiceException;

    List<Notification> getConversationMessages(long sender, long receiver) throws ServiceException;

    int getUnreadCount(long userId) throws ServiceException;

    void markAllRead(long userId) throws ServiceException;

    void markAllRead(long sender, long receiver) throws ServiceException;
}
