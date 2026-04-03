package controller;

import bean.Response;
import bean.UserResponse;
import com.google.gson.Gson;
import entity.User;
import enums.UserRole;
import service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;


@WebServlet("/user/*")
public class UserController extends HttpServlet {
    private final UserService userService = new UserService();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 如果你有“获取当前登录用户信息”等接口，可以放在这里
        String path = request.getServletPath();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", false, null));
            return;
        }

        try {
            switch (path) {
                case "/me":      // 获取当前登录用户信息
                    getCurrentUser(request, response);
                    break;
                default:
                    writeJson(response, new Response<>("不支持的 GET 操作: " + path, false, null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), false, null));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 所有写操作 POST 进来
        request.setCharacterEncoding("UTF-8");
        String path = request.getServletPath();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别path", false, null));
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
                default:
                    writeJson(response, new Response<>("不支持的 POST 操作: " + path, false, null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            writeJson(response, new Response<>(e.getMessage(), false, null));
        }
    }

    private void getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession session = request.getSession(false);
        if (session == null) {
            writeJson(response, new Response<>("未登录", false, null));
            return;
        }
        long id = (long) session.getAttribute("id");
        User user = new User();
        try{
            user=userService.getUserById(id);
        }catch (Exception e){
            writeJson(response, new Response<>(e.getMessage(), false, null));
        }
        writeJson(response, new Response<UserResponse>("获取用户信息成功", true, new UserResponse(user)));
    }


    private void register(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //从request中获取参数
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String role = request.getParameter("role");

        User user;
        try {
            user = userService.register(username, password, role);
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), false, null));//接收丢出的异常
            return;
        }
        writeJson(response, new Response<UserResponse>("注册成功", true, new UserResponse(user)));
        request.getSession().setAttribute("id", user.getId());
    }

    private void login(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User user;
        try {
            user = userService.login(username, password);
        } catch (Exception e) {
            writeJson(response, new Response<UserResponse>(e.getMessage(), false, null));
            return;
        }
        writeJson(response, new Response<UserResponse>("登录成功", true, new UserResponse(user)));
        request.getSession().setAttribute("id", user.getId());
    }

    private void logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        request.getSession().invalidate();
        writeJson(response, new Response<>("退出登录成功", true, null));
    }

    private void update(HttpServletRequest request, HttpServletResponse response) throws Exception {
        long id=(long) request.getSession().getAttribute("id");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String information = request.getParameter("information");
        User user;
        try {
            user=userService.update(id, username, email, phone, information);
        }catch (Exception e){
            writeJson(response, new Response<UserResponse>(e.getMessage(), false, null));
            return;
        }
        writeJson(response, new Response<UserResponse>("更新成功", true, new UserResponse(user)));
    }

    private void changePassword(HttpServletRequest request, HttpServletResponse response) throws Exception {
        long id = Long.parseLong(request.getParameter("id"));
        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");
        User user = null;
        try {
            user = userService.changePassword(id, oldPassword, newPassword);
        } catch (Exception e) {
            writeJson(response, new Response<UserResponse>(e.getMessage(), false, null));
        }
        writeJson(response, new Response<UserResponse>("更改成功", true, new UserResponse(user)));
    }

    private void recharge(HttpServletRequest request, HttpServletResponse response) throws Exception {
        long id =(long)request.getSession().getAttribute("id");
        double amount = Double.parseDouble(request.getParameter("amount"));
        User user = new User();
        try {
            user = userService.recharge(id, amount);
        } catch (Exception e) {
            writeJson(response, new Response<UserResponse>(e.getMessage(), false, null));
        }
        writeJson(response, new Response<UserResponse>("充值成功", true, new UserResponse(user)));
    }

    private void writeJson(HttpServletResponse response, Object body) throws IOException {
        try {
            response.setContentType("application/json;charset=UTF-8");
            StringBuilder sb = new StringBuilder();
            String json = gson.toJson(body);
            response.getWriter().write(json);
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(500);//返回前端状态码
        }
    }
}
