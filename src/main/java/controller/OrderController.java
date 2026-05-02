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
       writeJson(response, new Response<>("ok", 200, orderService.getByBuyer(userId)));
    }

    public void sellOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        writeJson(response, new Response<>("ok", 200, orderService.getBySeller(userId)));
    }

    public void createOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long itemId = Long.parseLong(request.getParameter("itemId"));
        int number = Integer.parseInt(request.getParameter("number"));
        orderService.add(itemId, userId, number);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void deleteOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
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
        long orderId = Long.parseLong(request.getParameter("orderId"));
        orderService.trade(orderId, userId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void cancel(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long orderId = Long.parseLong(request.getParameter("orderId"));
        orderService.cancel(orderId, userId);
        writeJson(response, new Response<>("ok", 200, null));
    }
}
