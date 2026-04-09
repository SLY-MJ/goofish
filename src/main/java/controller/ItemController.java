package controller;

import bean.CommentResponse;
import bean.ItemResponse;
import bean.Response;
import com.google.gson.Gson;
import entity.Comment;
import entity.Item;
import service.CommentService;
import service.FavoriteService;
import service.ItemService;
import exception.ServiceException;
import util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@WebServlet("/items/*")
public class ItemController extends HttpServlet implements JsonUtil {
    private final ItemService itemService = new ItemService();
    private final FavoriteService favoriteService = new FavoriteService();
    private final CommentService commentService = new CommentService();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response){
        String path = request.getPathInfo();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别标签", 404, null));
            return;
        }

        try {
            switch (path) {
                case "/my":
                    getMy(request, response);
                    break;
                case "/recommend":
                    getRecommend(request, response);
                    break;
                case "/detail":
                    getDetail(request, response);
                    break;
                case "/search":
                    search(request, response);
                    break;
                case "/favorite":
                    getMyFavorite(request, response);
                    break;
                case "/comment":
                    getComment(request,response);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getPathInfo();
        if (path == null || path.equals("/")) {
            writeJson(response, new Response<>("无法识别标签", 404, null));
            return;
        }
        try {
            switch (path) {
                case "/add":
                    publish(request, response);
                    break;
                case "/edit":
                    edit(request, response);
                    break;
                case "/delete":
                    delete(request, response);
                    break;
                case "/favorite":
                    favorite(request, response);
                    break;
                case "/unfavorite":
                    unfavorite(request, response);
                    break;
                case "/addComment":
                    addComment(request,response);
                    break;
                case "/deleteComment":
                    deleteComment(request,response);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //=======GET方法=========
    private void getMy(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("请先登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        List<Item> items = null;
        try {
            items = itemService.findBySeller(userId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("获取我的商品成功", 200, ItemResponse.dto(items)));
    }

    private void getRecommend(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("请先登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        List<Item> items = null;
        try {
            items = itemService.recommend(userId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("获取推荐商品成功", 200, ItemResponse.dto(items)));
    }

    private void getDetail(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("请先登录", 401, null));
            return;
        }
        long id = Long.parseLong(request.getParameter("id"));
        Item item = null;
        try {
            item = itemService.findById(id);
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), 401, null));
        }
        writeJson(response, new Response<>("获取商品详情成功", 200, item));

    }

    private void search(HttpServletRequest request, HttpServletResponse response) {
        String keyword = request.getParameter("keyword");
        List<Item> items = null;
        try {
            items = itemService.search(keyword);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("获取推荐商品成功", 200, ItemResponse.dto(items)));
    }

    private void getMyFavorite(HttpServletRequest request,HttpServletResponse response){
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("请先登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        List<Item> items = null;
        try{
            items=favoriteService.getMyFavorite(userId);
        }catch (ServiceException e){
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("获取我的收藏成功", 200, ItemResponse.dto(items)));
    }

    private void getComment(HttpServletRequest request, HttpServletResponse response) {
       long id = Long.parseLong(request.getParameter("id"));
       List<Comment> comments = null;
        try {
            comments=commentService.findByItemId(id);
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), 401, null));
        }
        writeJson(response, new Response<>("获取商品评论成功", 200, CommentResponse.dto(comments)));
    }

    //======POST方法=========
    private void publish(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("请先登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        double price = Double.parseDouble(request.getParameter("price"));
        String coverImage = request.getParameter("coverImage");
        try {
            itemService.add(userId, title, description, price, coverImage);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
    }

    private void edit(HttpServletRequest request, HttpServletResponse response) {
        long id = Long.parseLong(request.getParameter("id"));
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        double price = Double.parseDouble(request.getParameter("price"));
        int stock = Integer.parseInt(request.getParameter("stock"));
        String status = request.getParameter("status");
        String coverImage = request.getParameter("coverImage");
        try {
            itemService.edit(id, title, description, price, stock, status, coverImage);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("编辑商品成功", 200, null));
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("请先登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        long id = Long.parseLong(request.getParameter("id"));
        try {
            itemService.delete(userId,id);
        } catch (Exception e) {
            writeJson(response, new Response<>(e.getMessage(), 401, null));
        }
        writeJson(response, new Response<>("删除商品成功", 200, null));
    }

    private void favorite(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        long itemId = Long.parseLong(request.getParameter("id"));
        try {
            favoriteService.add(userId, itemId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("收藏商品成功", 200, null));
    }

    private void unfavorite(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        long itemId = Long.parseLong(request.getParameter("id"));
        try {
            favoriteService.remove(userId, itemId);
        } catch (ServiceException e) {
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("取消收藏商品成功", 200, null));
    }

    private void  addComment(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        long itemId = Long.parseLong(request.getParameter("id"));
        String content = request.getParameter("content");
        try{
            commentService.add(itemId,userId,content);
        }catch (ServiceException e){
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("添加评论成功", 200, null));
    }

    private void deleteComment(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session == null) {
            writeJson(response, new Response<>("未登录", 401, null));
            return;
        }
        long userId = (long) session.getAttribute("id");
        long id=Long.parseLong(request.getParameter("id"));
        try{
            commentService.delete(userId,id);
        }catch (ServiceException e){
            writeJson(response, new Response<>(e.getMessage(), e.getCode(), null));
        }
        writeJson(response, new Response<>("删除评论成功", 200, null));
    }

}
