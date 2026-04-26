import { get, post } from "@/api/http";

export function getCurrentUser() {
  return get("/user/getCurrentUser");
}

export function getUserDetail(id) {
  return get("/user/getDetail", { params: { id } });
}

export function searchUsers(username) {
  return get("/user/search", { params: { username } });
}

export function getMyFollows() {
  return get("/user/getFollows");
}

export function getMyFans() {
  return get("/user/getFans");
}

export function register(payload) {
  return post("/user/register", payload);
}

export function login(payload) {
  return post("/user/login", payload);
}

export function logout(refreshToken) {
  return post("/user/logout", { refreshToken });
}

export function refreshToken(refreshToken) {
  return post("/user/refreshToken", { refreshToken });
}

export function getCaptcha() {
  return get("/user/captcha");
}

export function verifyResetIdentity(payload) {
  return post("/user/verifyResetIdentity", payload);
}

export function resetPassword(payload) {
  return post("/user/resetPassword", payload);
}

export function updateProfile(payload) {
  return post("/user/update", payload);
}

export function changePassword(payload) {
  return post("/user/changePassword", payload);
}

export function recharge(payload) {
  return post("/user/recharge", payload);
}

export function followUser(followedId) {
  return post("/user/follow", { followedId });
}

export function unfollowUser(followedId) {
  return post("/user/unfollow", { followedId });
}
