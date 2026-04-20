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

@WebServlet("/api/admin/*")
public class AdminController extends BaseController{
    private final AdminService adminService = new AdminService();

    public void registerAdmin(HttpServletRequest request, HttpServletResponse response) {
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

    public void deleteUser(HttpServletRequest request, HttpServletResponse response) {
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

    public void deleteItem(HttpServletRequest request, HttpServletResponse response) {
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

    public void deleteComment(HttpServletRequest request, HttpServletResponse response) {
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
