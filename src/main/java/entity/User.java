package entity;

import enums.UserRole;

public class User {
    private long id;
    private String username;
    private String email;
    private String phone;
    private String passwordHash;
    private String salt;
    private UserRole role;
    private String information;
    private double walletBalance;
    private boolean status;//1是正常 0是被禁用
    //只读字段，让数据库自己更新时间
    private String createTime;
    private String updateTime;

    public User() {
    }

    //全字段构造：查询时使用
    public User(long id, String username, String email, String phone, String passwordHash, String salt, UserRole role,
                String information, double walletBalance, boolean status, String createTime, String updateTime) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.role = role;
        this.information = information;
        this.walletBalance = walletBalance;
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    //注册时使用：
    public User(String username, String passwordHash, String salt, UserRole role) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.role = role;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public double getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(double walletBalance) {
        this.walletBalance = walletBalance;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}
