import axiosInstance from "../interceptors/auth.interceptor";

export const addToCart = async (product: {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}) => {
  const response = await axiosInstance.post("/api/cart/add", product);
  return response.data;
};

export const fetchCart = async () => {
  const response = await axiosInstance.get("/api/cart");
  return response.data;
};

export const removeCartItem = async (productId: string) => {
  const response = await axiosInstance.delete(`/api/cart/remove/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axiosInstance.delete("/api/cart/clear");
  return response.data;
};
