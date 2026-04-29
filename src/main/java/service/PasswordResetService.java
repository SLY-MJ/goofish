package service;

import dao.RefreshTokenDao;
import dao.UserDao;
import entity.User;
import exception.ServiceException;
import util.PasswordUtil;

import java.security.SecureRandom;
import java.sql.SQLException;
import java.time.Duration;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PasswordResetService {
    private static final long RESET_TOKEN_TTL_MS = Duration.ofMinutes(10).toMillis();
    private static final int RESET_TOKEN_BYTES = 32;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Map<String, ResetTokenEntry> RESET_TOKEN_CACHE = new ConcurrentHashMap<>();

    private final UserDao userDao = new UserDao();
    private final RefreshTokenDao refreshTokenDao = new RefreshTokenDao();

    private record ResetTokenEntry(long userId, long expiresAt) {}

    public String verifyIdentityAndIssueToken(String username, String email, String phone) throws ServiceException {
        if (isBlank(username)) {
            throw new ServiceException(400, "username is required");
        }
        if (isBlank(email) && isBlank(phone)) {
            throw new ServiceException(400, "email or phone is required");
        }

        try {
            User user = userDao.findByUsername(username.trim());
            if (user == null || !user.getStatus()) {
                throw new ServiceException(404, "User not found");
            }

            boolean emailMatched = !isBlank(email) && email.trim().equalsIgnoreCase(defaultString(user.getEmail()));
            boolean phoneMatched = !isBlank(phone) && phone.trim().equals(defaultString(user.getPhone()));
            if (!emailMatched && !phoneMatched) {
                throw new ServiceException(401, "Identity verification failed");
            }

            cleanupExpired();
            String token = generateResetToken();
            RESET_TOKEN_CACHE.put(token, new ResetTokenEntry(user.getId(), System.currentTimeMillis() + RESET_TOKEN_TTL_MS));
            return token;
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public void resetPassword(String resetToken, String newPassword) throws ServiceException {
        validatePassword(newPassword);
        if (isBlank(resetToken)) {
            throw new ServiceException(400, "resetToken is required");
        }

        cleanupExpired();
        ResetTokenEntry entry = RESET_TOKEN_CACHE.remove(resetToken.trim());
        if (entry == null || System.currentTimeMillis() >= entry.expiresAt()) {
            throw new ServiceException(401, "resetToken is invalid or expired");
        }

        try {
            User user = userDao.findById(entry.userId());
            if (user == null || !user.getStatus()) {
                throw new ServiceException(404, "User not found");
            }
            PasswordUtil.HashSalt hashSalt = PasswordUtil.hash(newPassword);
            user.setPasswordHash(hashSalt.hash());
            user.setSalt(hashSalt.salt());
            userDao.updatePassword(user);
            refreshTokenDao.revokeByUserId(user.getId());
        } catch (SQLException e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private String generateResetToken() {
        byte[] bytes = new byte[RESET_TOKEN_BYTES];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private void cleanupExpired() {
        long now = System.currentTimeMillis();
        RESET_TOKEN_CACHE.entrySet().removeIf(e -> now >= e.getValue().expiresAt());
    }

    private void validatePassword(String password) throws ServiceException {
        if (isBlank(password) || password.length() < 6 || password.length() > 40) {
            throw new ServiceException(400, "Password length must be between 6 and 40");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String defaultString(String value) {
        return value == null ? "" : value;
    }
}

