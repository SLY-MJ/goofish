import { get, post } from "@/api/http";

export function getBuyOrders() {
  return get("/orders/buylist");
}

export function getSellOrders() {
  return get("/orders/sellist");
}

export function createOrder(payload) {
  return post("/orders/create", payload);
}

export function deleteOrder(orderId) {
  return post("/orders/delete", { orderId });
}

export function deleteOrderByItem(itemId) {
  return post("/orders/delete", { itemId });
}

export function payOrder(orderId) {
  return post("/orders/pay", { orderId });
}

export function cancelOrder(orderId) {
  return post("/orders/cancel", { orderId });
}
