import  api  from "./axiosInstance";

export const getTeamMembers = async () => {
  const response = await api.get("/team");
  return response.data;
};

export const getAllTeamMembers = async () => {
  const response = await api.get("/team/admin");
  return response.data;
};

export const getTeamMemberById = async (id) => {
  const response = await api.get(`/team/${id}`);
  return response.data;
};

export const createTeamMember = async (payload) => {
  const response = await api.post("/team", payload);
  return response.data;
};

export const updateTeamMember = async (id, payload) => {
  const response = await api.put(`/team/${id}`, payload);
  return response.data;
};

export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team/${id}`);
  return response.data;
};

export const uploadTeamImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return response.data.data.image;
};