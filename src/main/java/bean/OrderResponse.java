package bean;

import entity.Item;
import entity.Order;
import entity.User;
import enums.OrderStatus;

import java.util.ArrayList;
import java.util.List;

public class OrderResponse {
    private long id;
    private double amount;
    private OrderStatus status;
    private String createTime;

    private long itemId;
    private String itemTitle;
    private String coverImage;

    private long buyerId;
    private String buyerName;

    private long sellerId;
    private String sellerName;


    public static OrderResponse dto(Order order, Item item, User buyer, User seller) {
        OrderResponse r = new OrderResponse();
        r.setId(order.getId());
        r.setAmount(order.getAmount());
        r.setStatus(order.getStatus());
        r.setCreateTime(order.getCreateTime());

        if (item != null) {
            r.setItemId(item.getId());
            r.setItemTitle(item.getTitle());
            r.setCoverImage(item.getCoverImage());
        }

        if (buyer != null) {
            r.setBuyerId(buyer.getId());
            r.setBuyerName(buyer.getUsername());
        }

        if (seller != null) {
            r.setSellerId(seller.getId());
            r.setSellerName(seller.getUsername());
        }
        return r;
    }

    public OrderResponse() {
    }

    public OrderResponse(long id, double amount, OrderStatus status, String createTime, long itemId,
                         String itemTitle, String coverImage, long buyerId, String buyerName, long sellerId, String sellerName) {
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.createTime = createTime;
        this.itemId = itemId;
        this.itemTitle = itemTitle;
        this.coverImage = coverImage;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
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

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public String getItemTitle() {
        return itemTitle;
    }

    public void setItemTitle(String itemTitle) {
        this.itemTitle = itemTitle;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(long buyerId) {
        this.buyerId = buyerId;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public long getSellerId() {
        return sellerId;
    }

    public void setSellerId(long sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }
}
