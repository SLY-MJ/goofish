import { post } from "@/api/http";

export function registerAdmin(payload) {
  return post("/admin/registerAdmin", payload);
}

export function adminDeleteUser(id) {
  return post("/admin/deleteUser", { id });
}

export function adminDeleteItem(id) {
  return post("/admin/deleteItem", { id });
}

export function adminDeleteComment(id) {
  return post("/admin/deleteComment", { id });
}
