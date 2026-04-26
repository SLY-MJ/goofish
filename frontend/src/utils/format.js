const ITEM_STATUS_TEXT = {
  SUBMITTED: "待审核",
  REJECTED: "已驳回",
  ON_SALE: "在售",
  SOLD: "已售出",
  OFF_SHELF: "已下架",
};

const ORDER_STATUS_TEXT = {
  CREATED: "待付款",
  PAID: "已付款",
  CANCELLED: "已取消",
  REFUNDED: "已退款",
};

export function formatPrice(value) {
  const amount = Number(value || 0);
  return `¥${amount.toFixed(2)}`;
}

export function formatItemStatus(status) {
  return ITEM_STATUS_TEXT[status] || status || "未知状态";
}

export function formatOrderStatus(status) {
  return ORDER_STATUS_TEXT[status] || status || "未知状态";
}

export function resolveImage(url) {
  if (!url) {
    return "";
  }

  return String(url).trim();
}
