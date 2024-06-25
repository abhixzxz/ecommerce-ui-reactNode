import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";

export const customGet = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    const sucesMessage = response.data.message || "Success";
    Swal.fire({
      icon: "success",
      title: "Success",
      text: sucesMessage,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

export const customPost = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    const sucesMessage = response.data.message || "Success";

    Swal.fire({
      icon: "success",
      title: "Success",
      // text: JSON.stringify(response.data, null, 2),
      text: sucesMessage,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
    throw new Error(errorMessage);
  }
};
