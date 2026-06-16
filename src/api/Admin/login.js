import { authApi } from "../config";
import { loginApi } from "../axios";

// 🔐 LOGIN
export const loginAdmin = async (email, password) => {
  const res = await loginApi.post(
    "/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

// 🔎 VERIFY TOKEN
export const verifyToken = async () => {
  const res = await authApi.get("/auth/verify-token", {
    withCredentials: true,
  });
  return res.data;
};

// 🚪 LOGOUT
export const logoutAdmin = async () => {
  await authApi.post("/auth/logout", {}, {
    withCredentials: true,
  });
};