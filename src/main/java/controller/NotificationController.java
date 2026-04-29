package controller;

import bean.Response;
import exception.ServiceException;
import service.NotificationService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/notification/*")
public class NotificationController extends BaseController {
    private final NotificationService notificationService = new NotificationService();

    public void getMy(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        writeJson(response, new Response<>("ok", 200, notificationService.getMyNotifications(userId)));
    }

    public void getOne(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long receiver=Long.parseLong(request.getParameter("id"));
        writeJson(response, new Response<>("ok", 200, notificationService.getConversationMessages(userId, receiver)));
    }

    public void send(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long receiver=Long.parseLong(request.getParameter("id"));
        String message = request.getParameter("message");
        notificationService.sendMessage(userId, receiver, message);
        writeJson(response, new Response<>("ok", 200,null));
    }

    public void getUnreadCount(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        int count = notificationService.getUnreadCount(userId);
        Map<String, Integer> data = new HashMap<>();
        data.put("count", count);
        writeJson(response, new Response<>("ok", 200, data));
    }


    public void readAll(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        notificationService.markAllRead(userId);
        writeJson(response, new Response<>("ok", 200, null));
    }
}
