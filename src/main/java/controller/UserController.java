package controller;

import bean.Response;
import bean.UserResponse;
import com.google.gson.Gson;
import entity.User;
import service.FollowService;
import service.UserService;
import exception.ServiceException;
import util.JsonUtil;

import javax.servlet.ServletException;
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
        // 如果你有“获取当前登录用户信息”等接口，可以放在这里
        String path = request.getPathInfo();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/me":      // 获取当前登录用户信息
                    getCurrentUser(request, response);
                    break;
                case "/follows":
                    getFollows(request, response);
                    break;
                case "/fans":
                    getFans(request, response);
                    break;
                case "/search":
                    search(request,response);
                    break;
                default:
                    writeJson(response, new Response<>("不支持的 GET 操作: " + path, 404, null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 所有写操作 POST 进来
        request.setCharacterEncoding("UTF-8");
        String path = request.getPathInfo();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", 404, null));
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
                    writeJson(response, new Response<>("不支持的 POST 操作: " + path, 404, null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    //===============GET函数==============
    private void getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        User user = new User();
        try {
            user = userService.getUserById(id);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("获取用户信息成功", 200, new UserResponse(user)));
    }

    private void getFollows(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        List<User> follows = null;
        try {
            follows = followService.getFollows(id);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("获取成功", 200, UserResponse.dto(follows)));
    }

    private void getFans(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        List<User> fans = null;
        try {
            fans = followService.getFans(id);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("获取粉丝成功", 200, UserResponse.dto(fans)));
    }

    private void search(HttpServletRequest request, HttpServletResponse response){
        String username = request.getParameter("username");
        List<User> users = null;
        try {
            users = userService.search(username);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("搜索成功", 200, UserResponse.dto(users)));
    }

    //================POST函数================
    private void register(HttpServletRequest request, HttpServletResponse response) {
        //从request中获取参数
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User user;
        try {
            user = userService.register(username, password);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));//接收丢出的异常
            return;
        }
        writeJson(response, new Response<>("注册成功", 200, new UserResponse(user)));
        request.getSession().setAttribute("id", user.getId());
    }

    private void login(HttpServletRequest request, HttpServletResponse response) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User user;
        try {
            user = userService.login(username, password);
        } catch (ServiceException e) {
            writeJson(response, new Response<UserResponse>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("登录成功", 200, new UserResponse(user)));
        request.getSession().setAttribute("id", user.getId());
    }

    private void logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        writeJson(response, new Response<>("退出登录成功", 200, null));
    }

    private void update(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String information = request.getParameter("information");
        User user;
        try {
            user = userService.update(id, username, email, phone, information);
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), 500, null));
            return;
        }
        writeJson(response, new Response<>("更新成功", 200, new UserResponse(user)));
    }

    private void changePassword(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");
        User user = null;
        try {
            user = userService.changePassword(id, oldPassword, newPassword);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("更改成功", 200, new UserResponse(user)));
    }

    private void recharge(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        double amount = Double.parseDouble(request.getParameter("amount"));
        User user = new User();
        try {
            user = userService.recharge(id, amount);
        } catch (ServiceException e) {
            writeJson(response, new Response<UserResponse>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("充值成功", 200, new UserResponse(user)));
    }

    private void follow(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long followerId = (long) session.getAttribute("id");
        long followedId = Long.parseLong(request.getParameter("followedId"));
        try {
            followService.add(followerId, followedId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("关注成功", 200, null));
    }

    private void unfollow(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long followerId = (long) session.getAttribute("id");
        long followedId = Long.parseLong(request.getParameter("followedId"));
        try {
            followService.delete(followerId, followedId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }
        writeJson(response, new Response<>("取关成功", 200, null));
    }
}
