
import api from "./axiosInstance";

// ==========================================
// GET ALL SERVICES
// ==========================================

export const getServices = async () => {
  const response = await api.get("/services");

  return response.data.data;
};

// ==========================================
// GET SINGLE SERVICE
// ==========================================

export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);

  return response.data.data;
};

// ==========================================
// CREATE SERVICE
// ==========================================

export const createService = async (serviceData) => {
  const response = await api.post("/services", serviceData);

  return response.data;
};

// ==========================================
// UPDATE SERVICE
// ==========================================

export const updateService = async (id, serviceData) => {
  const response = await api.put(`/services/${id}`, serviceData);

  return response.data;
};

// ==========================================
// DELETE SERVICE
// ==========================================

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);

  return response.data;
};

// UPLOAD SERVICE IMAGE
export const uploadServiceImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return response.data.data.image;
};
