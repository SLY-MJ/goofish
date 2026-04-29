package service;

import dao.FollowDao;
import dao.UserDao;
import entity.Follow;
import entity.User;
import exception.ServiceException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FollowService {
    private final FollowDao followDao = new FollowDao();
    private final UserDao userDao = new UserDao();
    private final NotificationService notificationService = new NotificationService();

    public long add(long followerId, long followedId) throws ServiceException {
        if (followerId <= 0 || followedId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }
        if (followerId == followedId) {
            throw new ServiceException(400, "You cannot follow yourself");
        }

        try {
            if (followDao.exists(followerId, followedId)) {
                return -1;
            }
            long id = followDao.add(followerId, followedId);
            sendFollowMessage(followedId, userDao.findById(followerId).getUsername());
            return id;
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public boolean delete(long followerId, long followedId) throws ServiceException {
        if (followerId <= 0 || followedId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }

        try {
            if (!followDao.exists(followerId, followedId)) {
                return true;
            }
            followDao.deleteByFollowerAndFollowed(followerId, followedId);
            return true;
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<User> getFollows(long followerId) throws ServiceException {
        if (followerId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }

        try {
            List<Follow> follows = followDao.findByFollowerId(followerId);
            return loadUsers(follows, true);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    public List<User> getFans(long followedId) throws ServiceException {
        if (followedId <= 0) {
            throw new ServiceException(400, "Invalid user id");
        }

        try {
            List<Follow> fans = followDao.findByFollowedId(followedId);
            return loadUsers(fans, false);
        } catch (Exception e) {
            throw new ServiceException(500, e.getMessage());
        }
    }

    private List<User> loadUsers(List<Follow> follows, boolean useFollowedUser) throws SQLException {
        List<User> users = new ArrayList<>();
        if (follows == null || follows.isEmpty()) {
            return users;
        }

        for (Follow follow : follows) {
            long userId = useFollowedUser ? follow.getFollowedId() : follow.getFollowerId();
            User user = userDao.findById(userId);
            if (user != null) {
                users.add(user);
            }
        }
        return users;
    }

    private void sendFollowMessage(long userId, String username) throws ServiceException {
        String message = "用户:" + username + "已关注你";
        notificationService.sendSystemNotification(userId, message);
    }
}
