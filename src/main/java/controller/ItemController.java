package controller;

import bean.CommentResponse;
import bean.ItemResponse;
import bean.Response;
import entity.Comment;
import entity.Item;
import exception.ServiceException;
import service.CommentService;
import service.FavoriteService;
import service.ItemService;
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

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        String path = request.getPathInfo();
        if (path == null || "/".equals(path)) {
            writeJson(response, new Response<>("Unknown path", 404, null));
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
                    getComment(request, response);
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
                    addComment(request, response);
                    break;
                case "/deleteComment":
                    deleteComment(request, response);
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

    private void getMy(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        List<Item> items = itemService.findBySeller(userId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    private void getRecommend(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getOptionalLoginUserId(request);
        List<Item> items = itemService.recommend(userId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    private void getDetail(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long id = Long.parseLong(request.getParameter("id"));
        itemService.increaseViewCount(id);
        Item item = itemService.findById(id);
        writeJson(response, new Response<>("ok", 200, item));
    }

    private void search(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        List<Item> items = itemService.search(request.getParameter("keyword"));
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    private void getMyFavorite(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        List<Item> items = favoriteService.getMyFavorite(userId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    private void getComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long id = Long.parseLong(request.getParameter("id"));
        List<Comment> comments = commentService.findByItemId(id);
        writeJson(response, new Response<>("ok", 200, CommentResponse.dto(comments)));
    }

    private void publish(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        itemService.add(
                userId,
                request.getParameter("title"),
                request.getParameter("description"),
                Double.parseDouble(request.getParameter("price")),
                request.getParameter("coverImage")
        );
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void edit(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        itemService.edit(
                userId,
                Long.parseLong(request.getParameter("id")),
                request.getParameter("title"),
                request.getParameter("description"),
                Double.parseDouble(request.getParameter("price")),
                Integer.parseInt(request.getParameter("stock")),
                request.getParameter("status"),
                request.getParameter("coverImage")
        );
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long id = Long.parseLong(request.getParameter("id"));
        itemService.delete(userId, id);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void favorite(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long itemId = Long.parseLong(request.getParameter("id"));
        favoriteService.add(userId, itemId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void unfavorite(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long itemId = Long.parseLong(request.getParameter("id"));
        favoriteService.remove(userId, itemId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void addComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long itemId = Long.parseLong(request.getParameter("id"));
        String content = request.getParameter("content");
        commentService.add(itemId, userId, content);
        writeJson(response, new Response<>("ok", 200, null));
    }

    private void deleteComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        if (userId == null) {
            return;
        }

        long id = Long.parseLong(request.getParameter("id"));
        commentService.delete(userId, id);
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

    private Long getOptionalLoginUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            return null;
        }
        return ((Number) session.getAttribute("id")).longValue();
    }
}
