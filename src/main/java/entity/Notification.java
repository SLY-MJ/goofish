package entity;

import java.sql.Timestamp;

public class Notification {
    private long id;
    private long sender;//id 为0的代表是系统发送的
    private long receiver;
    private int type;//0是通知 1是用户聊天
    private String content;
    private boolean isRead;
    private Timestamp createTime;

    public Notification() {
    }

    public Notification(long id, long sender, long receiver, int type, String content, boolean isRead, Timestamp createTime) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
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

    public long getSender() {
        return sender;
    }

    public void setSender(long sender) {
        this.sender = sender;
    }

    public long getReceiver() {
        return receiver;
    }

    public void setReceiver(long receiver) {
        this.receiver = receiver;
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
