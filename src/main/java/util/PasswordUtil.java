package util;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public final class PasswordUtil {
    private static final String ALGORITHM="PBKDF2WithHmacSHA256";
    private static final int ITERATION=120000;
    private static final int KEY_LENGTH=256;
    private static final int SALT_SIZE=8;

    private static final SecureRandom random = new SecureRandom();

    public record HashSalt(String hash, String salt) {}

    private static String getSalt(){
        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    private static String getHash(String password, String salt){
        byte[] saltBytes = Base64.getDecoder().decode(salt);//转回二进制字节码格式
        try {
            //定义PBKDF2算法的参数：密码、盐、迭代次数、密钥长度
            PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), saltBytes, ITERATION, KEY_LENGTH);
            //选择算法
            SecretKeyFactory factory = SecretKeyFactory.getInstance(ALGORITHM);
            //执行算法
            byte[] hash = factory.generateSecret(spec).getEncoded();
            //变为字符串传输
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Hashing failed", e);
        }
    }

    public static HashSalt hash(String password){
        String salt = getSalt();
        String hash = getHash(password, salt);
        return new HashSalt(hash, salt);
    }

    public static boolean verify(String password, HashSalt hashSalt){
        String salt = hashSalt.salt;
        String hash = getHash(password, salt);
        return hashSalt.hash.equals(hash);
    }


}
