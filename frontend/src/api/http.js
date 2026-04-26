import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const ACCESS_TOKEN_KEY = "xianyu_access_token";
const REFRESH_TOKEN_KEY = "xianyu_refresh_token";

let refreshingPromise = null;

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

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
}

export function setAccessToken(token) {
  if (!token) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || "";
}

export function setRefreshToken(token) {
  if (!token) {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return;
  }
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function clearAuthTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

function isAuthEndpoint(url = "") {
  return url.includes("/user/login")
    || url.includes("/user/register")
    || url.includes("/user/refreshToken")
    || url.includes("/user/logout")
    || url.includes("/user/captcha")
    || url.includes("/user/verifyResetIdentity")
    || url.includes("/user/resetPassword");
}

async function requestNewAccessToken(refreshToken) {
  const response = await http.post(
    "/user/refreshToken",
    toSearchParams({ refreshToken }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      _skipAuthRefresh: true,
    },
  );

  const body = response?.data;
  if (!body || body.code !== 200 || !body.data) {
    const error = new Error(body?.message || "刷新登录状态失败");
    error.code = body?.code ?? 401;
    throw error;
  }

  return body.data;
}

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config || {};
    const status = error?.response?.status;

    if (
      status !== 401
      || originalRequest._retry
      || originalRequest._skipAuthRefresh
      || isAuthEndpoint(String(originalRequest.url || ""))
    ) {
      throw error;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearAuthTokens();
      throw error;
    }

    originalRequest._retry = true;

    try {
      if (!refreshingPromise) {
        refreshingPromise = requestNewAccessToken(refreshToken).finally(() => {
          refreshingPromise = null;
        });
      }

      const newAccessToken = await refreshingPromise;
      setAccessToken(newAccessToken);
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return http(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      throw refreshError;
    }
  },
);

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

  if (error?.response?.data?.message) {
    return error.response.data.message;
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
