import { authApi } from "../../config";
import { buildPeopleFormData } from "./postPeople";

export const updatePeople = async (type, id, data) => {
  let url;
  if (type === "teamMembers") {
    url = `/admin/teamMember/update/${id}`;
  } else if (type === "alumni") {
    url = `/admin/alumini/update-Alumini/${id}`;
  } else {
    throw new Error("Invalid type for updatePeople");
  }

  const payload = buildPeopleFormData(type, data);
  const response = await authApi.put(url, payload);
  return response.data;
};
