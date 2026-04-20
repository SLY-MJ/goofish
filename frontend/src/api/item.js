import { get, post } from "@/api/http";

export function getRecommendItems() {
  return get("/items/getRecommend");
}

export function getMyItems() {
  return get("/items/getMy");
}

export function getFavoriteItems() {
  return get("/items/getMyFavorite");
}

export function searchItems(keyword) {
  return get("/items/search", { params: { keyword } });
}

export function getItemDetail(id) {
  return get("/items/getDetail", { params: { id } });
}

export function getSellerItems(sellerId) {
  return get("/items/getBySeller", { params: { sellerId } });
}

export function getItemComments(id) {
  return get("/items/getComment", { params: { id } });
}

export function publishItem(payload) {
  return post("/items/publish", payload);
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
