import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);

    const token = localStorage.getItem("token");

    if (!token || !userData.id) {
      navigate("/login");
      return;
    }
  }, [navigate]);

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
            </section>

            <Link to="/orders" className="btn-primary">
              <section className="order-history card">
                <h3>Your Orders</h3>
              </section>
            </Link>

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
