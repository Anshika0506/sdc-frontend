import { authApi } from "../config";
import { loginApi } from "../axios";

export const loginAdmin = async (email, password) => {
  try {
    const res = await loginApi.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    const body = res.data;
    if (body?.status === false) {
      throw new Error(body.message || "Login failed");
    }

    return body;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      (error.response?.status === 401
        ? "Invalid email or password"
        : error.message || "Login failed");
    throw new Error(message);
  }
};

export const verifyToken = async () => {
  const res = await authApi.get("/auth/verify-token", {
    withCredentials: true,
  });
  return res.data;
};

export const logoutAdmin = async () => {
  await authApi.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
