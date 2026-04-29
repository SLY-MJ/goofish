package service;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.ShearCaptcha;
import exception.ServiceException;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class CaptchaService {
    private static final long CAPTCHA_TTL_MS = 2L * 60 * 1000;
    private static final Map<String, CaptchaEntry> CAPTCHA_CACHE = new ConcurrentHashMap<>();

    public record CaptchaResult(String captchaId, String imageBase64) {}

    private record CaptchaEntry(String code, long expiresAt) {}

    public CaptchaResult createCaptcha() {
        cleanupExpired();
        ShearCaptcha captcha = CaptchaUtil.createShearCaptcha(130, 40, 4, 2);
        String captchaId = UUID.randomUUID().toString();
        CAPTCHA_CACHE.put(captchaId, new CaptchaEntry(captcha.getCode(), System.currentTimeMillis() + CAPTCHA_TTL_MS));
        return new CaptchaResult(captchaId, captcha.getImageBase64Data());
    }

    public void verifyAndConsume(String captchaId, String captchaCode) throws ServiceException {
        if (isBlank(captchaId) || isBlank(captchaCode)) {
            throw new ServiceException(400, "captchaId and captchaCode are required");
        }
        cleanupExpired();
        CaptchaEntry entry = CAPTCHA_CACHE.remove(captchaId);
        if (entry == null) {
            throw new ServiceException(400, "Captcha is expired");
        }
        if (System.currentTimeMillis() >= entry.expiresAt()) {
            throw new ServiceException(400, "Captcha is expired");
        }
        if (!entry.code().equalsIgnoreCase(captchaCode.trim())) {
            throw new ServiceException(400, "Captcha is invalid");
        }
    }

    private void cleanupExpired() {
        long now = System.currentTimeMillis();
        CAPTCHA_CACHE.entrySet().removeIf(e -> now >= e.getValue().expiresAt());
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}

