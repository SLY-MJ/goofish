package implement;

import exception.ServiceException;

public interface RefreshTokenServiceImp {
    String refresh(String refreshToken)throws ServiceException;

    void logout(String refreshToken)throws ServiceException;
}
