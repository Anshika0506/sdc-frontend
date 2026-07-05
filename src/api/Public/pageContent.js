import { publicApi } from "../axios";

export const getPageContent = async () => {
  const res = await publicApi.get("/public/page-content");
  return res.data;
};
