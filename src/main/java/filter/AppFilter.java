package filter;

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
public class AppFilter implements Filter {
    private static final Set<String> ALLOWED_ORIGINS = Set.of(
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:8080",
            "http://127.0.0.1:8080"
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
        //放行给controller
        chain.doFilter(servletRequest, servletResponse);
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
        if (path.startsWith("/user") || path.startsWith("/items") || path.startsWith("/orders") || path.startsWith("/admin")) {
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

    @Override
    public void destroy() {
    }
}
