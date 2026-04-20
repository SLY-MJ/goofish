import { get, post } from "@/api/http";

export function getBuyOrders() {
  return get("/orders/buyOrder");
}

export function getSellOrders() {
  return get("/orders/sellOrder");
}

export function createOrder(payload) {
  return post("/orders/createOrder", payload);
}

export function deleteOrder(orderId) {
  return post("/orders/deleteOrder", { orderId });
}

export function deleteOrderByItem(itemId) {
  return post("/orders/deleteOrder", { itemId });
}

export function payOrder(orderId) {
  return post("/orders/pay", { orderId });
}

export function cancelOrder(orderId) {
  return post("/orders/cancel", { orderId });
}
