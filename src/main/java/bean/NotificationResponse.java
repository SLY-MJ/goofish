package bean;

import entity.Notification;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class NotificationResponse {
    private long id;
    private int type;
    private String content;
    private boolean isRead;
    private Timestamp createTime;

    public static NotificationResponse dto(Notification notification) {
        if (notification == null) {
            return null;
        }
        return new NotificationResponse(
                notification.getId(),
                notification.getType(),
                notification.getContent(),
                notification.isRead(),
                notification.getCreateTime()
        );
    }

    public static List<NotificationResponse> dto(List<Notification> notifications) {
        if (notifications == null) {
            return null;
        }
        List<NotificationResponse> list = new ArrayList<>();
        for (Notification notification : notifications) {
            list.add(dto(notification));
        }
        return list;
    }

    public NotificationResponse() {
    }

    public NotificationResponse(long id, int type, String content, boolean isRead, Timestamp createTime) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.isRead = isRead;
        this.createTime = createTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }
}
