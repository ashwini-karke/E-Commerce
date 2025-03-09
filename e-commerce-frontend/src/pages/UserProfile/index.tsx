import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
// import { getUserOrders } from "../services/order.service"; // Uncomment this when ready to fetch orders

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    const token = localStorage.getItem("token");

    // If no token or user data, redirect to login
    if (!token || !userData.id) {
      navigate("/login"); // Redirect to login page
      return;
    }
    // Fetch user's orders (Uncomment when API integration is available)
    // const fetchOrders = async () => {
    //   const fetchedOrders = await getUserOrders(userData.id);
    //   setOrders(fetchedOrders);
    // };
    // fetchOrders();
  }, []);

  return (
    <div className="profile">
      {user && (
        <div className="user-profile-container">
          <section className="profile-head">
            <h2 className="greeting">Welcome, {user?.name || "User"}</h2>
            <button
              className="btn-logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </section>

          <div className="user-profile-sections">
            <section className="profile-info card">
              <h3>Profile Information</h3>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              {/* Add more info like address, payment methods, etc. */}
            </section>

            <section className="order-history card">
              <h3>Your Orders</h3>
              {orders.length > 0 ? (
                <ul>
                  {orders.map((order: any) => (
                    <li key={order.id}>
                      <Link to={`/order/${order.id}`}>
                        Order #{order.id} - {order.status}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders yet.</p>
              )}
            </section>

            <Link to="/checkout" className="btn-primary">
              <section className="cart-quick-view card">
                <h3>View Cart</h3>
              </section>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
