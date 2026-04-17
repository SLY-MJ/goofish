import { get, post } from "@/api/http";

export function getCurrentUser() {
  return get("/user/me");
}

export function getUserDetail(id) {
  return get("/user/detail", { params: { id } });
}

export function searchUsers(username) {
  return get("/user/search", { params: { username } });
}

export function getMyFollows() {
  return get("/user/follows");
}

export function getMyFans() {
  return get("/user/fans");
}

export function register(payload) {
  return post("/user/register", payload);
}

export function login(payload) {
  return post("/user/login", payload);
}

export function logout() {
  return post("/user/logout");
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
