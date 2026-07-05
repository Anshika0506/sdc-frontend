import { authApi } from "../config";

export const getAdminPageContent = async () => {
  const res = await authApi.get("/admin/page-content");
  return res.data;
};

export const updatePageContent = async (content) => {
  const res = await authApi.put("/admin/page-content", content);
  return res.data;
};
