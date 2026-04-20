package controller;

import bean.Response;
import bean.UserResponse;
import entity.User;
import exception.ServiceException;
import service.FollowService;
import service.UserService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/user/*")
public class UserController extends BaseController{
    private final UserService userService = new UserService();
    private final FollowService followService = new FollowService();

    public void getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        User user = userService.getUserById(userId);
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void getDetail(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long userId = Long.parseLong(request.getParameter("id"));
        User user = userService.getUserById(userId);
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void getFollows(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        List<User> follows = followService.getFollows(userId);
        writeJson(response, new Response<>("ok", 200, UserResponse.dto(follows)));
    }

    public void getFans(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        List<User> fans = followService.getFans(userId);
        writeJson(response, new Response<>("ok", 200, UserResponse.dto(fans)));
    }

    public void search(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        String username = request.getParameter("username");
        List<User> users = userService.search(username);
        writeJson(response, new Response<>("ok", 200, UserResponse.dto(users)));
    }

    public void register(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        User user = userService.register(request.getParameter("username"), request.getParameter("password"));
        request.getSession(true).setAttribute("id", user.getId());
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void login(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        User user = userService.login(request.getParameter("username"), request.getParameter("password"));
        request.getSession(true).setAttribute("id", user.getId());
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void update(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        User user = userService.update(
                userId,
                request.getParameter("username"),
                request.getParameter("email"),
                request.getParameter("phone"),
                request.getParameter("information")
        );
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void changePassword(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        User user = userService.changePassword(
                userId,
                request.getParameter("oldPassword"),
                request.getParameter("newPassword")
        );
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void recharge(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        double amount = Double.parseDouble(request.getParameter("amount"));
        User user = userService.recharge(userId, amount);
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    public void follow(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long followedId = Long.parseLong(request.getParameter("followedId"));
        followService.add(userId, followedId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void unfollow(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long followedId = Long.parseLong(request.getParameter("followedId"));
        followService.delete(userId, followedId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private Long getLoginUserId(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            writeJson(response, new Response<>("Not logged in", 401, null));
            return null;
        }

        Object value = session.getAttribute("id");
        if (value instanceof Number) {
            return ((Number) value).longValue();
        }

        writeJson(response, new Response<>("Invalid session", 401, null));
        return null;
    }
}
