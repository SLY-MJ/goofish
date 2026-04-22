package util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JWTUtil {
    private final static long time = 1000L * 60 * 30;//30分钟
    private final static SecretKey ACCESS_KEY=loadKey();

    public static String createToken(long userId) {
        JwtBuilder builder = Jwts.builder();
        long now = new Date().getTime();
        return builder
                .subject(String.valueOf(userId))
                .issuedAt(new Date(now))
                .expiration(new Date(now + time))
                .signWith(ACCESS_KEY)
                .compact();
    }

    public static long parseToken(String token) {
        Claims claims=Jwts.parser()
                .verifyWith(ACCESS_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return Long.parseLong(claims.getSubject());
    }

    public static boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private static SecretKey loadKey() {
        String base64 = System.getProperty("jwt.access.secret", System.getenv("JWT_ACCESS_SECRET"));
        if (base64 == null || base64.isBlank()) {
            throw new IllegalStateException("Missing JWT_ACCESS_SECRET");
        }
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64)); // HS256至少32字节
    }
}
