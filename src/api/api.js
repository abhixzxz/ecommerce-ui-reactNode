import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:8666/api";

export const customGet = async (url) => {
  try {
    const response = await axiosInstance.get(baseUrl + url);
    const successMessage = response.data.message || "Success";
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("customGet error:", errorMessage);
    toast.error(errorMessage, {
      position: "top-right",
    });
    throw new Error(errorMessage);
  }
};

export const customPost = async (url, data, showAlert = true) => {
  try {
    const response = await axiosInstance.post(baseUrl + url, data);
    const successMessage = response.data.message || "Success";
    if (showAlert) {
      toast.success(successMessage, {
        position: "top-right",
      });
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("customPost error:", errorMessage);
    if (showAlert) {
      toast.error(errorMessage, {
        position: "top-right",
      });
    }
    throw new Error(errorMessage);
  }
};

export const customPut = async (url, data, showAlert = true) => {
  try {
    const response = await axiosInstance.put(baseUrl + url, data);
    const successMessage = response.data.message || "Success";
    if (showAlert) {
      toast.success(successMessage, {
        position: "top-right",
      });
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("customPut error:", errorMessage);
    if (showAlert) {
      toast.error(errorMessage, {
        position: "top-right",
      });
    }
    throw new Error(errorMessage);
  }
};

export const customDelete = async (url) => {
  try {
    const response = await axiosInstance.delete(baseUrl + url);
    const successMessage = response.data.message || "Success";
    toast.success(successMessage, {
      position: "top-right",
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("customDelete error:", errorMessage);
    toast.error(errorMessage, {
      position: "top-right",
    });
    throw new Error(errorMessage);
  }
};

export const customPostUpload = async (url, formData) => {
  try {
    const response = await axiosInstance.post(baseUrl + url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const successMessage = response.data.message || "Success";
    toast.success(successMessage, {
      position: "top-right",
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("customPostUpload error:", errorMessage);
    toast.error(errorMessage, {
      position: "bottom-left",
    });
    if (error.response?.status === 409) {
      throw new Error("Email already exists");
    }

    throw new Error(errorMessage);
  }
};
