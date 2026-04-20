package controller;

import bean.Response;
import exception.ServiceException;
import service.OrderService;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/api/orders/*")
public class OrderController extends BaseController {
    private final OrderService orderService = new OrderService();

    public void buyOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        writeJson(response, new Response<>("ok", 200, orderService.getByBuyer(userId)));
    }

    public void sellOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        writeJson(response, new Response<>("ok", 200, orderService.getBySeller(userId)));
    }

    public void createOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long itemId = Long.parseLong(request.getParameter("itemId"));
        long sellerId = Long.parseLong(request.getParameter("sellerId"));
        orderService.add(itemId, userId, sellerId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void deleteOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        String orderId = request.getParameter("orderId");
        String itemId = request.getParameter("itemId");
        if (orderId != null && !orderId.isBlank()) {
            orderService.delete(Long.parseLong(orderId), userId);
        } else if (itemId != null && !itemId.isBlank()) {
            orderService.deleteByItemId(Long.parseLong(itemId), userId);
        } else {
            throw new ServiceException(400, "orderId or itemId is required");
        }
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void pay(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long orderId = Long.parseLong(request.getParameter("orderId"));
        orderService.trade(orderId, userId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void cancel(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long orderId = Long.parseLong(request.getParameter("orderId"));
        orderService.cancel(orderId, userId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private Long getLoginUserId(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            writeJson(response, new Response<>("Not logged in", 401, null));
            return null;
        }
        return ((Number) session.getAttribute("id")).longValue();
    }
}
