package service;

import dao.RefreshTokenDao;
import entity.RefreshToken;
import exception.ServiceException;
import implement.RefreshTokenServiceImp;
import util.JWTUtil;
import util.RefreshTokenUtil;

public class RefreshTokenService implements RefreshTokenServiceImp {
    private final RefreshTokenDao  refreshTokenDao=new RefreshTokenDao();

    @Override
    public String refresh(String refreshToken) throws ServiceException {
        String hash=RefreshTokenUtil.hashToken(refreshToken);
        RefreshToken rt=refreshTokenDao.findByHash(hash);
        if(rt==null){
            throw new ServiceException(401,"invalid refresh token");
        }
        long now=RefreshTokenUtil.getNow();
        if (RefreshTokenUtil.isExpired(rt.getExpiresAt(),now)){
            refreshTokenDao.Revoke(hash);
            throw new ServiceException(401,"refresh token expired");
        }
        return JWTUtil.createToken(rt.getUserId());
    }

    @Override
    public void logout(String refreshToken) throws ServiceException {
        if(refreshToken==null||refreshToken.isEmpty()){
            throw new ServiceException(401,"invalid refresh token");
        }
        String hash=RefreshTokenUtil.hashToken(refreshToken);
        RefreshToken rt=refreshTokenDao.findByHash(hash);
        if(rt==null){
            throw new ServiceException(401,"invalid refresh token");
        }
        refreshTokenDao.Revoke(hash);
    }
}
