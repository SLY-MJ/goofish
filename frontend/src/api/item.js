import { get, post } from "@/api/http";

export function getRecommendItems() {
  return get("/items/recommend");
}

export function getMyItems() {
  return get("/items/my");
}

export function getFavoriteItems() {
  return get("/items/favorite");
}

export function searchItems(keyword) {
  return get("/items/search", { params: { keyword } });
}

export function getItemDetail(id) {
  return get("/items/detail", { params: { id } });
}

export function getSellerItems(sellerId) {
  return get("/items/seller", { params: { sellerId } });
}

export function getItemComments(id) {
  return get("/items/comment", { params: { id } });
}

export function publishItem(payload) {
  return post("/items/add", payload);
}

export function editItem(payload) {
  return post("/items/edit", payload);
}

export function deleteItem(id) {
  return post("/items/delete", { id });
}

export function favoriteItem(id) {
  return post("/items/favorite", { id });
}

export function unfavoriteItem(id) {
  return post("/items/unfavorite", { id });
}

export function addComment(id, content) {
  return post("/items/addComment", { id, content });
}

export function deleteComment(id) {
  return post("/items/deleteComment", { id });
}
