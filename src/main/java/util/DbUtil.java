package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class DbUtil {
    private static final String URL = "jdbc:mysql://localhost:3306/your_database_name?useSSL=false&serverTimezone=UTC";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "123456";

    private DbUtil() {}

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
}
