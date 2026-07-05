import { authApi } from "../../config";

const appendTeamMemberFields = (formData, data) => {
  formData.append("name", data.name ?? "");
  formData.append("branch", data.branch ?? "");
  formData.append("position", data.position ?? "");
  formData.append("linkdin_url", data.linkdin_url ?? "");
  formData.append("github_url", data.github_url ?? "");
  formData.append("insta_url", data.insta_url ?? "");

  const projectIds = Array.isArray(data.projectIds) ? data.projectIds : [];
  if (projectIds.length > 0) {
    projectIds.forEach((id) => formData.append("projectIds", String(id)));
  }

  if (data.image && typeof data.image !== "string") {
    formData.append("image", data.image);
  }
};

const appendAlumniFields = (formData, data) => {
  formData.append("aluminiName", data.aluminiName ?? "");
  formData.append("companyName", data.companyName ?? "");
  formData.append("lpa", data.lpa ?? "");
  formData.append("content", data.content ?? "");

  if (data.image && typeof data.image !== "string") {
    formData.append("image", data.image);
  }
};

export const buildPeopleFormData = (type, data) => {
  const formData = new FormData();

  if (type === "teamMembers") {
    appendTeamMemberFields(formData, data);
  } else if (type === "alumni") {
    appendAlumniFields(formData, data);
  } else {
    throw new Error("Invalid type for buildPeopleFormData");
  }

  return formData;
};

export const postPeople = async (type, data) => {
  let url;
  if (type === "teamMembers") {
    url = "/admin/teamMember/add";
  } else if (type === "alumni") {
    url = "/admin/alumini/saveAlumini";
  } else {
    throw new Error("Invalid type for postPeople");
  }

  const payload = buildPeopleFormData(type, data);
  const response = await authApi.post(url, payload);
  return response.data;
};
