import { authApi } from "../../config";

export const deletePeople = async (type, id) => {
  let url;
  if (type === "teamMembers") {
    url = `/admin/teamMember/delete/${id}`;
  } else if (type === "alumni") {
    url = `/admin/alumini/delete-alumini/${id}`;
  } else {
    throw new Error("Invalid type for deletePeople");
  }

  const response = await authApi.delete(url);
  return response.data;
};
