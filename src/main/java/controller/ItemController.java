package controller;

import bean.CommentResponse;
import bean.ItemDetailResponse;
import bean.ItemResponse;
import bean.Response;
import com.google.gson.reflect.TypeToken;
import dao.UserDao;
import entity.Item;
import entity.ItemImage;
import entity.User;
import exception.ServiceException;
import service.CommentService;
import service.FavoriteService;
import service.ItemImageService;
import service.ItemService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/items/*")
public class ItemController extends BaseController {
    private final ItemService itemService = new ItemService();
    private final FavoriteService favoriteService = new FavoriteService();
    private final CommentService commentService = new CommentService();
    private final ItemImageService itemImageService = new ItemImageService();
    private final UserDao userDao = new UserDao();

    public void getMy(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        List<Item> items = itemService.findBySeller(userId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    public void getRecommend(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getOptionalLoginUserId(request);
        List<Item> items = itemService.recommend(userId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    public void getDetail(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long id = Long.parseLong(request.getParameter("id"));
        itemService.increaseViewCount(id);
        Item item = itemService.findById(id);
        try {
            User seller = item == null ? null : userDao.findById(item.getSellerId());
            List<ItemImage> images = itemImageService.findByItemId(id);
            writeJson(response, new Response<>("ok", 200, ItemDetailResponse.dto(item, seller, images)));
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public void search(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        List<Item> items = itemService.search(request.getParameter("keyword"));
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    public void getBySeller(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long sellerId = Long.parseLong(request.getParameter("sellerId"));
        List<Item> items = itemService.findBySeller(sellerId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    public void getMyFavorite(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        List<Item> items = favoriteService.getMyFavorite(userId);
        writeJson(response, new Response<>("ok", 200, ItemResponse.dto(items)));
    }

    public void getComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long id = Long.parseLong(request.getParameter("id"));
        List<CommentResponse> comments = commentService.findByItemId(id);
        writeJson(response, new Response<>("ok", 200, comments));
    }

    public void publish(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        String imageUrlsJson = request.getParameter("imageUrls");
        Type type = new TypeToken<List<String>>() {
        }.getType();
        List<String> imageUrls;
        try {
            imageUrls = imageUrlsJson == null ? null : gson.fromJson(imageUrlsJson, type);
        } catch (RuntimeException e) {
            throw new ServiceException(400, "Invalid imageUrls format");
        }
        if (imageUrls == null) {
            imageUrls = new ArrayList<>();
        }
        imageUrls.removeIf(url -> url == null || url.trim().isEmpty());
        String coverImage = request.getParameter("coverImage");
        if (imageUrls.isEmpty() && coverImage != null && !coverImage.trim().isEmpty()) {
            imageUrls.add(coverImage.trim());
        }
        if (imageUrls.isEmpty()) {
            throw new ServiceException(400, "At least one image url is required");
        }

        long itemId = itemService.submit(
                        userId,
                        request.getParameter("title"),
                        request.getParameter("description"),
                        Double.parseDouble(request.getParameter("price")),
                        Integer.parseInt(request.getParameter("stock"))
                        );
        itemImageService.add(itemId,imageUrls);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void edit(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        itemService.edit(
                userId,
                Long.parseLong(request.getParameter("id")),
                request.getParameter("title"),
                request.getParameter("description"),
                Double.parseDouble(request.getParameter("price")),
                Integer.parseInt(request.getParameter("stock"))
        );
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void delete(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long id = Long.parseLong(request.getParameter("id"));
        itemService.delete(userId, id);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void favorite(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long itemId = Long.parseLong(request.getParameter("id"));
        favoriteService.add(userId, itemId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void unfavorite(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long itemId = Long.parseLong(request.getParameter("id"));
        favoriteService.remove(userId, itemId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void addComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long itemId = Long.parseLong(request.getParameter("id"));
        String content = request.getParameter("content");
        commentService.add(itemId, userId, content);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void deleteComment(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Long userId = getLoginUserId(request, response);
        long id = Long.parseLong(request.getParameter("id"));
        commentService.delete(userId, id);
        writeJson(response, new Response<>("ok", 200, null));
    }


}
