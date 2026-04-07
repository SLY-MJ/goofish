package bean;

import entity.User;

import java.util.ArrayList;
import java.util.List;

public class UserResponse {
    private long id;
    private String username;
    private String role;
    private String information;
    private double wallet;

    public UserResponse(User user) {
        this.id = user.getId();
        this.username =user.getUsername();
        this.role = user.getRole().toString();
        this.information = user.getInformation();
        this.wallet=user.getWalletBalance();
    }

    public static UserResponse dto(User user){
        if(user == null) return null;
        return new UserResponse(user);
    }

    public static List<UserResponse> dto(List<User> users){
        if(users == null) return null;
        List<UserResponse> userResponseList = new ArrayList<>();
        for (User user : users) {
            userResponseList.add(dto(user));
        }
        return userResponseList;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public double getWallet() {
        return wallet;
    }

    public void setWallet(double wallet) {
        this.wallet = wallet;
    }
}
