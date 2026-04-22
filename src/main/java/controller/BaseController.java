package controller;

import bean.Response;
import exception.ServiceException;
import util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class BaseController extends HttpServlet implements JsonUtil {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri=req.getRequestURI();

        int index=uri.lastIndexOf("/");

        String methodName=uri.substring(index+1);

        Class<? extends BaseController> cls=this.getClass();

        try {
            Method method = cls.getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, req, resp);
        } catch (InvocationTargetException e) {
            Throwable cause = e.getCause();
            if (cause instanceof ServiceException se) {
                writeJson(resp, new Response<>(se.getMessage(), se.getCode(), null));
                return;
            }
            throw new ServletException(cause);
        } catch (NoSuchMethodException e) {
            writeJson(resp, new Response<>("API not found", 404, null));
        } catch (IllegalAccessException e) {
            throw new ServletException(e);
        }

    }

    protected Long getLoginUserId(HttpServletRequest request, HttpServletResponse response) throws ServiceException {
        Object uid = request.getAttribute("id");
        if (!(uid instanceof Number)) {
            throw new ServiceException(401, "Unauthorized");
        }
        return ((Number) uid).longValue();
    }

    protected Long getOptionalLoginUserId(HttpServletRequest request) {
        Object uid = request.getAttribute("id");
        if (!(uid instanceof Number)) {
            return null;
        }
        return ((Number) uid).longValue();
    }

}
