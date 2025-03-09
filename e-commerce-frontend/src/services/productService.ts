import axiosInstance from "../interceptors/auth.interceptor";

export const getProducts = async () => {
  const response = await axiosInstance.get("/api/products");
  return response.data;
};

export const addProduct = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/products/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const response = await axiosInstance.put(`/api/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(`/api/products/${id}`);
  return response.data;
};
