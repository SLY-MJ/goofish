package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class DbUtil {
    private static final String HOST = read("db.host", "DB_HOST", "localhost");
    private static final String PORT = read("db.port", "DB_PORT", "3306");
    private static final String DATABASE = read("db.name", "DB_NAME", "goofish");
    private static final String USERNAME = read("db.username", "DB_USERNAME", "root");
    private static final String PASSWORD = read("db.password", "DB_PASSWORD", "123456");
    private static final String URL =
            "jdbc:mysql://" + HOST + ":" + PORT + "/" + DATABASE
                    + "?useSSL=false&serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new ExceptionInInitializerError("MySQL driver not found: " + e.getMessage());
        }
    }

    private DbUtil() {
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }

    private static String read(String propertyName, String envName, String defaultValue) {
        String propertyValue = System.getProperty(propertyName);
        if (propertyValue != null && !propertyValue.isBlank()) {
            return propertyValue;
        }

        String envValue = System.getenv(envName);
        if (envValue != null && !envValue.isBlank()) {
            return envValue;
        }

        return defaultValue;
    }
}
