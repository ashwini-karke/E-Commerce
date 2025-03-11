import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrders } from "../../services/orderService";
import "./index.css";
import OrderCard from "../../components/OrdersCard";

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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = userData?.isAdmin || false;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !userData.id) {
      navigate("/login");
      return;
    }

    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders(
          search.length >= 3 ? { name: search } : {}
        );
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, [navigate, search]);

  return (
    <div className="orders-container">
      <div className="order-header">
        <div className="order-searchbar">
          <h2>Your Orders</h2>
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="/user-profile" className="btn-back">
          Back to Profile
        </Link>
      </div>

      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} isAdmin={isAdmin} />
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
