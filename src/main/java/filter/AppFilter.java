package filter;

import bean.Response;
import exception.ServiceException;
import util.JWTUtil;
import util.JsonUtil;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.util.Set;

//过滤器
@WebFilter("/*")
public class AppFilter implements Filter, JsonUtil {
    private static final Set<String> ALLOWED_ORIGINS = Set.of(
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:15001",
            "http://127.0.0.1:15001"
    );

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        applyCorsHeaders(request, response);
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String path = request.getRequestURI().substring(request.getContextPath().length());
        if (shouldForwardToSpa(request, path)) {
            request.getRequestDispatcher("/index.html").forward(request, response);
            return;
        }

        if (!isApiRequest(path)) {
            chain.doFilter(servletRequest, servletResponse);
            return;
        }

        if (!isPublicApi(request, path)) {
            try {
                checkToken(request, response);
            } catch (ServiceException e) {
                writeJson(response, new Response<>(e.getMessage(), e.getCode(), e.getMessage()));
                return;
            }
        }
        //放行给controller
        chain.doFilter(servletRequest, servletResponse);
    }

    private void checkToken(HttpServletRequest request,HttpServletResponse response) throws ServiceException {
        String beaver = request.getHeader("Authorization");
        String token = extractBearerToken(beaver);
        if (token == null) {
            throw new ServiceException(401, "Authorization header is missing");
        }
        try {
            long userId = JWTUtil.parseToken(token);
            if (userId <= 0) {
                throw new ServiceException(401, "Invalid token");
            }
            request.setAttribute("id", userId);
        } catch (RuntimeException e) {
            throw new ServiceException(401, "Invalid token");
        }
    }

    private void applyCorsHeaders(HttpServletRequest request, HttpServletResponse response) {
        //获得请求头 检验是否是允许的
        String origin = request.getHeader("Origin");
        if (origin != null && ALLOWED_ORIGINS.contains(origin)) {
            //表示允许哪个前端地址来访问
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Vary", "Origin");
            //允许带cookie 这样才能获得session
            response.setHeader("Access-Control-Allow-Credentials", "true");
        }
        response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    }

    private boolean shouldForwardToSpa(HttpServletRequest request, String path) throws IOException {
        if (!"GET".equalsIgnoreCase(request.getMethod())) {
            return false;
        }
        if (isApiRequest(path)) {
            return false;
        }
        if (path.startsWith("/WEB-INF") || path.startsWith("/META-INF")) {
            return false;
        }
        if (path.contains(".")) {
            return false;
        }

        URL resource = request.getServletContext().getResource(path);
        return resource == null;
    }

    private boolean isApiRequest(String path) {
        return path.equals("/api") || path.startsWith("/api/");
    }

    private boolean isPublicApi(HttpServletRequest request, String path) {
        String method = request.getMethod().toUpperCase();

        // 认证相关
        if ("POST".equals(method) && (
                "/api/user/login".equals(path)
                        || "/api/user/register".equals(path)
                        || "/api/user/refreshToken".equals(path)
                        || "/api/user/verifyResetIdentity".equals(path)
                        || "/api/user/resetPassword".equals(path)
                        || "/api/user/logout".equals(path)
        )) {
            return true;
        }

        if ("GET".equals(method) && ("/api/user/captcha".equals(path)||
                            "/api/user/getDetail".equals(path))) {
            return true;
        }

        // 商品公开查询
        if ("GET".equals(method) && (
                "/api/items/getRecommend".equals(path) ||
                        "/api/items/getDetail".equals(path) ||
                        "/api/items/search".equals(path) ||
                        "/api/items/getBySeller".equals(path) ||
                        "/api/items/getComment".equals(path)
        )) {
            return true;
        }

        // 用户公开信息（按你的真实接口调整）
        if ("GET".equals(method) && (
                "/api/user/getDetail".equals(path) ||
                        "/api/user/search".equals(path)
        )) {
            return true;
        }

        return false;
    }

    private String extractBearerToken(String authHeader) {
        if (authHeader == null) return null;
        String prefix = "Bearer ";
        if (!authHeader.regionMatches(true, 0, prefix, 0, prefix.length())) return null;
        String token = authHeader.substring(prefix.length()).trim();
        return token.isEmpty() ? null : token;
    }

    @Override
    public void destroy() {
    }
}
