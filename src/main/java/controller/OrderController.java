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

@WebServlet("/orders/*")
public class OrderController extends HttpServlet implements JsonUtil {
    private final OrderService orderService = new OrderService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getPathInfo();
        if (path == null || "/".equals(path)) {
            writeJson(response, new Response<>("Unknown path", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/buylist":
                    buyOrder(request, response);
                    break;
                case "/sellist":
                    sellOrder(request, response);
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getPathInfo();
        if (path == null || "/".equals(path)) {
            writeJson(response, new Response<>("Unknown path", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/create":
                    createOrder(request, response);
                    break;
                case "/delete":
                    deleteOrder(request, response);
                    break;
                case "/pay":
                    pay(request, response);
                    break;
                case "/cancel":
                    cancel(request, response);
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

    private void buyOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        writeJson(response, new Response<>("ok", 200, orderService.getByBuyer(userId)));
    }

    private void sellOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        writeJson(response, new Response<>("ok", 200, orderService.getBySeller(userId)));
    }

    private void createOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long itemId = Long.parseLong(request.getParameter("itemId"));
        long sellerId = Long.parseLong(request.getParameter("sellerId"));
        orderService.add(itemId, userId, sellerId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void deleteOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
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

    private void pay(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long orderId = Long.parseLong(request.getParameter("orderId"));
        orderService.trade(orderId, userId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void cancel(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
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
