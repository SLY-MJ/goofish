package controller;

import bean.Response;
import bean.UserResponse;
import entity.User;
import exception.ServiceException;
import service.AdminService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/admin/*")
public class AdminController extends HttpServlet implements JsonUtil {
    private final AdminService adminService = new AdminService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        String path = request.getPathInfo();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/register":
                    registerAdmin(request, response);
                    break;
                case "/deleteUser":
                    deleteUser(request, response);
                    break;
                case "/deleteItem":
                    deleteItem(request, response);
                    break;
                case "/deleteComment":
                    deleteComment(request, response);
                    break;
                default:
                    writeJson(response, new Response<>("不支持的 POST 操作: " + path, 404, null));
            }
        }catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    private void registerAdmin(HttpServletRequest request, HttpServletResponse response) {
        Long adminId = getLoginUserId(request, response);
        if (adminId == null) {
            return;
        }

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User admin;
        try {
            admin = adminService.registerAdmin(adminId, username, password);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }

        writeJson(response, new Response<>("管理员注册成功", 200, new UserResponse(admin)));
    }

    private void deleteUser(HttpServletRequest request, HttpServletResponse response) {
        Long adminId = getLoginUserId(request, response);
        if (adminId == null) {
            return;
        }

        long userId = Long.parseLong(request.getParameter("id"));
        try {
            adminService.deleteUser(adminId, userId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }

        writeJson(response, new Response<>("删除用户成功", 200, null));
    }

    private void deleteItem(HttpServletRequest request, HttpServletResponse response) {
        Long adminId = getLoginUserId(request, response);
        if (adminId == null) {
            return;
        }

        long itemId = Long.parseLong(request.getParameter("id"));
        try {
            adminService.deleteItem(adminId, itemId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }

        writeJson(response, new Response<>("删除商品成功", 200, null));
    }

    private void deleteComment(HttpServletRequest request, HttpServletResponse response) {
        Long adminId = getLoginUserId(request, response);
        if (adminId == null) {
            return;
        }

        long commentId = Long.parseLong(request.getParameter("id"));
        try {
            adminService.deleteComment(adminId, commentId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
            return;
        }

        writeJson(response, new Response<>("删除评论成功", 200, null));
    }

    private Long getLoginUserId(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return null;
        }
        return (Long) session.getAttribute("id");
    }
}
