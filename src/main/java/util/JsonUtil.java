package util;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface JsonUtil {
    Gson gson = new Gson();

    default void writeJson(HttpServletResponse response, Object body) {
        try {
            response.setContentType("application/json;charset=UTF-8");
            String json = gson.toJson(body);
            response.getWriter().write(json);
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(500);//返回前端状态码
        }
    }
}
