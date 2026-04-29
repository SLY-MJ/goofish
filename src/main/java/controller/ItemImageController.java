package controller;

import bean.Response;
import exception.ServiceException;
import service.ItemImageService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/api/images/*")
public class ItemImageController extends BaseController {
    private final ItemImageService itemImageService = new ItemImageService();

    public void delete(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long imageId = Long.parseLong(request.getParameter("imageId"));
        itemImageService.delete(imageId);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void updateOrder(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long imageId = Long.parseLong(request.getParameter("imageId"));
        int order = Integer.parseInt(request.getParameter("sortOrder"));
        itemImageService.update(imageId, order);
        writeJson(response, new Response<>("ok", 200, null));
    }

    public void updateImage(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        long imageId = Long.parseLong(request.getParameter("imageId"));
        String url = request.getParameter("imageUrl");
        itemImageService.update(imageId, url);
        writeJson(response, new Response<>("ok", 200, null));
    }
}
