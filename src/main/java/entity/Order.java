package entity;

import enums.OrderStatus;

public class Order {
    private long id;
    private String orderNo;
    private long itemId;
    private long buyerId;
    private long sellerId;
    private int amount;
    private OrderStatus status;//"CREATED,'PAID''CANCELLED''REFUNDED'
    private String createTime;

    public Order() {
    }

    public Order(String orderNo, long itemId, long buyerId, long sellerId, int amount, OrderStatus status) {
        this.orderNo = orderNo;
        this.itemId = itemId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.amount = amount;
        this.status = status;
    }

    public Order(long id, String orderNo, long itemId, long buyerId, long sellerId, int amount, OrderStatus status, String createTime) {
        this.id = id;
        this.orderNo = orderNo;
        this.itemId = itemId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.amount = amount;
        this.status = status;
        this.createTime = createTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(long buyerId) {
        this.buyerId = buyerId;
    }

    public long getSellerId() {
        return sellerId;
    }

    public void setSellerId(long sellerId) {
        this.sellerId = sellerId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
