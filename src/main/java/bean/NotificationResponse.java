package bean;

import entity.Notification;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class NotificationResponse {
    private long id;
    private String username;
    private int unReadCount;

//    public static NotificationResponse dto(Notification notification) {
//        if (notification == null) {
//            return null;
//        }
//        return new NotificationResponse(
//                notification.getId(),
//                null,
//                0
//        );
//    }
//
//    public static List<NotificationResponse> dto(List<Notification> notifications) {
//        if (notifications == null) {
//            return null;
//        }
//        List<NotificationResponse> list = new ArrayList<>();
//        for (Notification notification : notifications) {
//            list.add(dto(notification));
//        }
//        return list;
//    }

    public NotificationResponse() {
    }

    public NotificationResponse(long id, String username, int unReadCount) {
        this.id = id;
        this.username = username;
        this.unReadCount = unReadCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUnReadCount() {
        return unReadCount;
    }

    public void setUnReadCount(int unReadCount) {
        this.unReadCount = unReadCount;
    }
}
