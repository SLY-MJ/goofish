package service;

import dao.FollowDao;
import dao.UserDao;
import entity.Follow;
import entity.User;

import exception.ServiceException;
import java.util.List;

public class FollowService {
    private final FollowDao followDao = new FollowDao();
    private final UserDao userDao = new UserDao();

    public long add(long followerId, long followedId) throws ServiceException {
        if(followerId<0 || followedId<0){
            throw new ServiceException(401,"ID格式不对");
        }
        long id;
        try{
            id=followDao.add(followerId, followedId);
        }catch(Exception e){
            throw new ServiceException(500,e.getMessage());
        }
        return id;
    }

    public boolean delete(long followerId, long followedId) throws Exception {
        if(followerId<0 || followedId<0){
            throw new ServiceException(401,"ID格式不对");
        }
        try{
            followDao.deleteByFollowerAndFollowed(followerId, followedId);
            return true;
        }catch(Exception e){
            throw new ServiceException(500,e.getMessage());
        }
    }

    public List<User> getFollows(long followedId) throws Exception {
        List<Follow> follows;
        if(followedId<0){
            throw new ServiceException(401,"ID格式不对");
        }
        try{
            follows=followDao.findByFollowedId(followedId);
        }catch(Exception e){
            throw new ServiceException(500,e.getMessage());
        }
        if(follows==null|| follows.isEmpty()){
            throw new ServiceException(404,"没有找到相关关注");
        }
        List<User> users = null;
        try{
            for(Follow follow:follows){
                User user=userDao.findById(follow.getFollowerId());
                if (user != null) {
                    users.add(user);
                }
            }
        }catch (Exception e){
            throw new ServiceException(500,e.getMessage());
        }
        return users;
    }

    public List<User> getFans(long followerId) throws Exception {
        List<Follow> followed;
        if(followerId<0){
            throw new ServiceException(401,"ID格式不对");
        }
        try{
            followed=followDao.findByFollowerId(followerId);
        }catch(Exception e){
            throw new ServiceException(500,e.getMessage());
        }
        if(followed==null|| followed.isEmpty()){
            throw new ServiceException(404,"没有找到相关关注");
        }
        List<User> users = null;
        try{
            for(Follow follow:followed){
                User user=userDao.findById(follow.getFollowedId());
                if (user != null) {
                    users.add(user);
                }
            }
        }catch (Exception e){
            throw new ServiceException(500,e.getMessage());
        }
        return users;
    }
}
