package util;

import bean.Response;
import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface JsonUtil {
    Gson gson = new Gson();

    default void writeJson(HttpServletResponse response, Object body) {
        try {
            if (body instanceof Response<?> responseBody) {
                response.setStatus(responseBody.getCode());
            }
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(gson.toJson(body));
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
