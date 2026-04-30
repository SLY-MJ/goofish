package bean;

import entity.Notification;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class NotificationResponse {
    private long id;
    private String username;
    private String latestMessage;
    private Timestamp latestTime;
    private int unReadCount;

    public NotificationResponse() {
    }

    public NotificationResponse(long id, String username,String latestMessage,Timestamp latestTime, int unReadCount) {
        this.id = id;
        this.username = username;
        this.latestMessage = latestMessage;
        this.latestTime = latestTime;
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


    public String getLatestMessage() {
        return latestMessage;
    }

    public void setLatestMessage(String latestMessage) {
        this.latestMessage = latestMessage;
    }

    public Timestamp getLatestTime() {
        return latestTime;
    }

    public void setLatestTime(Timestamp latestTime) {
        this.latestTime = latestTime;
    }
}
