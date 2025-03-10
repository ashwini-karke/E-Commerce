import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrders } from "../../services/orderService";
import "./index.css";

interface Order {
  _id: string;
  invoiceNumber: string;
  items: { _id: string; name: string; quantity: number; price: number }[];
  status: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    if (!token || !userData.id) {
      navigate("/login");
      return;
    }

    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, [navigate]);

  return (
    <div className="orders-container">
      <div className="order-header">
        <h2>Your Orders</h2>
        <Link to="/user-profile" className="btn-back">
          Back to Profile
        </Link>
      </div>

      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <div className="order-details">
                <p className="order-id">Order ID: {order._id}</p>
                <p className="invoice">Invoice: {order.invoiceNumber}</p>
                <div className="items">
                  <strong>Items:</strong>
                  {order.items.map((item) => (
                    <p key={item._id} className="item">
                      {item.name} - {item.quantity} x ₹{item.price} = ₹
                      {item.quantity * item.price}
                    </p>
                  ))}
                </div>
                <p className="status">Status: {order.status}</p>
                <p className="shipping">
                  Shipping Address: {order.shippingAddress}
                </p>
                <p className="total">Total Amount: ₹{order.totalAmount}</p>
                <p className="payment">Payment: {order.paymentDetails}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
