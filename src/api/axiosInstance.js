import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8666/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = document.cookie.split("; ");
    const accessTokenCookie = cookies.find((row) =>
      row.startsWith("accessToken")
    );
    if (accessTokenCookie) {
      const accessToken = accessTokenCookie.split("=")[1];
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance.request(error.config);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const cookies = document.cookie.split("; ");
    const refreshTokenCookie = cookies.find((row) =>
      row.startsWith("refreshToken")
    );
    if (refreshTokenCookie) {
      const refreshToken = refreshTokenCookie.split("=")[1];
      if (refreshToken) {
        const response = await axiosInstance.post("/token/refresh-token", {
          refreshToken,
        });
        console.log("calling for token");
        console.log("response00", response);
        document.cookie = `accessToken=${response.data.accessToken}; path=/; secure; samesite=strict; httponly`;

        return response.data.accessToken;
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Session expired",
      text: "Please log in again.",
    });
    // Optionally redirect to login page
    window.location.href = "/login";
  }
};

export default axiosInstance;
