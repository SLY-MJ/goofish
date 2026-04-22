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
public class AdminController extends BaseController {
    private final AdminService adminService = new AdminService();

    public void registerAdmin(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long adminId = getLoginUserId(request, response);

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        User admin;
        admin = adminService.registerAdmin(adminId, username, password);

        writeJson(response, new Response<>("管理员注册成功", 200, new UserResponse(admin)));
    }

    public void deleteUser(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long adminId = getLoginUserId(request, response);

        long userId = Long.parseLong(request.getParameter("id"));
        adminService.deleteUser(adminId, userId);

        writeJson(response, new Response<>("删除用户成功", 200, null));
    }

    public void deleteItem(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long adminId = getLoginUserId(request, response);

        long itemId = Long.parseLong(request.getParameter("id"));
        adminService.deleteItem(adminId, itemId);

        writeJson(response, new Response<>("删除商品成功", 200, null));
    }

    public void deleteComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long adminId = getLoginUserId(request, response);

        long commentId = Long.parseLong(request.getParameter("id"));
        adminService.deleteComment(adminId, commentId);

        writeJson(response, new Response<>("删除评论成功", 200, null));
    }

}
