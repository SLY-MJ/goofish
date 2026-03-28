package entity;

import enums.BusinessType;

public class WalletLog {
    private long id;
    private long userId;
    private double  changeAmount;
    private double balanceAfter;
    private BusinessType businessType;
    private long businessId;
    private String createTime;
    private String remark;//备注

    public WalletLog() {
    }

    public WalletLog(long userId, double changeAmount, double balanceAfter, BusinessType businessType, long businessId) {
        this.userId = userId;
        this.changeAmount = changeAmount;
        this.balanceAfter = balanceAfter;
        this.businessType = businessType;
        this.businessId = businessId;
    }

    public WalletLog(long id, long userId, double changeAmount, double balanceAfter, BusinessType businessType, long businessId, String createTime, String remark) {
        this.id = id;
        this.userId = userId;
        this.changeAmount = changeAmount;
        this.balanceAfter = balanceAfter;
        this.businessType = businessType;
        this.businessId = businessId;
        this.createTime = createTime;
        this.remark = remark;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public double getChangeAmount() {
        return changeAmount;
    }

    public void setChangeAmount(double changeAmount) {
        this.changeAmount = changeAmount;
    }

    public double getBalanceAfter() {
        return balanceAfter;
    }

    public void setBalanceAfter(double balanceAfter) {
        this.balanceAfter = balanceAfter;
    }

    public BusinessType getBusinessType() {
        return businessType;
    }

    public void setBusinessType(BusinessType businessType) {
        this.businessType = businessType;
    }

    public long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(long businessId) {
        this.businessId = businessId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
