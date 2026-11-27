
import api, {
  setAccessToken,
  clearAccessToken,
} from "./axiosInstance";

export const loginAdmin = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const result = response.data.data;

  if (!result?.accessToken) {
    throw new Error("Login response did not contain an access token");
  }

  setAccessToken(result.accessToken);

  return result;
};

export const refreshAdminSession = async () => {
  const response = await api.post("/auth/refresh");
  const result = response.data.data;

  if (!result?.accessToken) {
    throw new Error("Refresh response did not contain an access token");
  }

  setAccessToken(result.accessToken);

  return result;
};

export const logoutAdmin = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    clearAccessToken();
  }
};
