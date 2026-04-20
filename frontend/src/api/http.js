import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

function toSearchParams(payload = {}) {
  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (typeof value === "string" && value.trim() === "") {
      return;
    }

    params.append(key, String(value));
  });

  return params;
}

function unwrapResponse(response) {
  const body = response?.data;

  if (!body || typeof body.code !== "number") {
    return body;
  }

  if (body.code !== 200) {
    const error = new Error(body.message || "请求失败");
    error.code = body.code;
    error.payload = body;
    throw error;
  }

  return body.data;
}

export function getErrorMessage(error, fallback = "请求失败") {
  if (error?.payload?.message) {
    return error.payload.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
}

export async function get(url, config = {}) {
  return unwrapResponse(await http.get(url, config));
}

export async function post(url, payload = {}, config = {}) {
  return unwrapResponse(
    await http.post(url, toSearchParams(payload), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      ...config,
    }),
  );
}

export default http;
