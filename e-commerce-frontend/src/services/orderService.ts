import axiosInstance from "../interceptors/auth.interceptor";

export const createOrder = async (order: {
  items: { product: string; quantity: number }[];
  totalAmount: number;
  shippingAddress: string;
  paymentDetails: string;
}) => {
  const response = await axiosInstance.post("/api/orders/create", order);
  return response.data;
};

// export const fetchOrders = async () => {
//   const response = await axiosInstance.get("/api/orders");
//   return response.data;
// };

// export const getOrderDetails = async (orderId: string) => {
//   const response = await axiosInstance.get(`/api/orders/${orderId}`);
//   return response.data;
// };

export const fetchOrders = async (filters = {}) => {
  const response = await axiosInstance.get("/api/orders", { params: filters });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axiosInstance.patch(`/api/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};
