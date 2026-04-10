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
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", 401, null));
        }
        switch (path) {
            case "/buylist":
                buyOrder(request, response);
                break;
            case "/sellist":
                sellOrder(request, response);
                break;
            default:
                writeJson(response, new Response<>("无法识别path", 401, null));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        // 处理订单创建
        String path = request.getPathInfo();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", 401, null));
        }
        switch (path) {
            case "/create":
                createOrder(request, response);
                break;
            case "/delete":
                deleteOrder(request,response);
                break;
            case "/pay":
                pay(request,response);
                break;
            case "/cancel":
                cancel(request,response);
                break;
            default:
                writeJson(response, new Response<>("无法识别path", 401, null));
        }
    }

    //=======GET=======
    private void buyOrder(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session==null){
            writeJson(response,new Response<>("未登录", 401, null));
        }
        long buyerId=(long) session.getAttribute("userId");
        try {
            writeJson(response, new Response<>(null, 200, orderService.getByBuyer(buyerId)));
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    private void sellOrder(HttpServletRequest request, HttpServletResponse response) {
        long sellerId=Long.parseLong(request.getParameter("userId"));
        try{
            writeJson(response, new Response<>(null, 200, orderService.getBySeller(sellerId)));
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), 500, null));
        }
    }

    //=======POST========
    private void createOrder(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session==null){
            writeJson(response,new Response<>("未登录", 401, null));
        }
        long buyerId=(long) session.getAttribute("userId");
        long sellerId=Long.parseLong(request.getParameter("sellerId"));
        long itemId=Long.parseLong(request.getParameter("itemId"));
        try{
            orderService.add(itemId, buyerId, sellerId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response,new Response<>("订单创建成功",200,null));
    }

    private void deleteOrder(HttpServletRequest request, HttpServletResponse response) {
        long itemId=Long.parseLong(request.getParameter("itemId"));
        try {
            orderService.delete(itemId);
        }catch (ServiceException e){
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response,new Response<>("订单删除成功",200,null));
    }

    private void pay(HttpServletRequest request, HttpServletResponse response) {
        long orderId=Long.parseLong(request.getParameter("orderId"));
        try {
            orderService.trade(orderId);
        }catch (ServiceException e){
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response,new Response<>("订单支付成功",200,null));
    }

    private void cancel(HttpServletRequest request, HttpServletResponse response) {
        long orderId=Long.parseLong(request.getParameter("orderId"));
        try {
            orderService.cancel(orderId);
        }catch (ServiceException e){
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response,new Response<>("订单取消成功",200,null));
    }
}
