package util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

public class RefreshTokenUtil {
    private final static long TIME=1000L*60*60*24*30;
    private final static SecureRandom random=new SecureRandom();
    private static final int TOKEN_BYTES = 48;

    public record TokenInfo(String token, String tokenHash, long expireTime) {}

    public static TokenInfo getRefreshToken(long now) {
        String token=create();
        String tokenHash=hashToken(token);
        long expireTime=now+TIME;
        return new TokenInfo(token, tokenHash, expireTime);
    }

    public static String create() {
        byte[] bytes = new byte[TOKEN_BYTES];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static String hashToken(String token) {
        // 这里可以使用更安全的哈希算法，如SHA-256
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("refresh token is blank");
        }
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(token.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 unavailable", e);
        }
    }

    public static boolean isExpired(long expireTime,long now) {
        return now > expireTime;
    }

    public static long getNow() {
        return System.currentTimeMillis();
    }
}
