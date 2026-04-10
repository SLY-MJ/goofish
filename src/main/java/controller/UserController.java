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

@WebServlet("/user/*")
public class UserController extends HttpServlet implements JsonUtil {
    private final UserService userService = new UserService();
    private final FollowService followService = new FollowService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getPathInfo();
        if (path == null || "/".equals(path)) {
            writeJson(response, new Response<>("Unknown path", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/me":
                    getCurrentUser(request, response);
                    break;
                case "/follows":
                    getFollows(request, response);
                    break;
                case "/fans":
                    getFans(request, response);
                    break;
                case "/search":
                    search(request, response);
                    break;
                default:
                    writeJson(response, new Response<>("Unsupported GET path", 404, null));
            }
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        } catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        String path = request.getPathInfo();
        if (path == null || "/".equals(path)) {
            writeJson(response, new Response<>("Unknown path", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/register":
                    register(request, response);
                    break;
                case "/login":
                    login(request, response);
                    break;
                case "/logout":
                    logout(request, response);
                    break;
                case "/update":
                    update(request, response);
                    break;
                case "/changePassword":
                    changePassword(request, response);
                    break;
                case "/recharge":
                    recharge(request, response);
                    break;
                case "/follow":
                    follow(request, response);
                    break;
                case "/unfollow":
                    unfollow(request, response);
                    break;
                default:
                    writeJson(response, new Response<>("Unsupported POST path", 404, null));
            }
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        } catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    private void getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        User user = userService.getUserById(userId);
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    private void getFollows(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        List<User> follows = followService.getFollows(userId);
        writeJson(response, new Response<>("ok", 200, UserResponse.dto(follows)));
    }

    private void getFans(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        List<User> fans = followService.getFans(userId);
        writeJson(response, new Response<>("ok", 200, UserResponse.dto(fans)));
    }

    private void search(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        String username = request.getParameter("username");
        List<User> users = userService.search(username);
        writeJson(response, new Response<>("ok", 200, UserResponse.dto(users)));
    }

    private void register(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        User user = userService.register(request.getParameter("username"), request.getParameter("password"));
        request.getSession(true).setAttribute("id", user.getId());
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    private void login(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        User user = userService.login(request.getParameter("username"), request.getParameter("password"));
        request.getSession(true).setAttribute("id", user.getId());
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    private void logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void update(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
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

    private void changePassword(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
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

    private void recharge(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        double amount = Double.parseDouble(request.getParameter("amount"));
        User user = userService.recharge(userId, amount);
        writeJson(response, new Response<>("ok", 200, new UserResponse(user)));
    }

    private void follow(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long followedId = Long.parseLong(request.getParameter("followedId"));
        followService.add(userId, followedId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void unfollow(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
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
