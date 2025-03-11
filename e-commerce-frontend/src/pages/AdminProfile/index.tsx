import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import AddProductModal from "../../components/AddProductModal";
import UpdateProductModal from "../../components/UpdateProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AdminProfile: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setAdmin(userData);

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
      {admin && (
        <div className="admin-profile-container">
          <div className="profile-head">
            <h2>Admin Dashboard</h2>
            <button
              className="btn-logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>

          <div className="admin-profile-cards">
            <Card title="Add Product" onClick={() => setShowAddModal(true)} />
            <Card title="Update Product" onClick={() => navigate("/orders")} />
            <Card
              title="Delete Product"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
          {showAddModal && (
            <AddProductModal onClose={() => setShowAddModal(false)} />
          )}
          {showUpdateModal && (
            <UpdateProductModal onClose={() => setShowUpdateModal(false)} />
          )}
          {showDeleteModal && (
            <DeleteProductModal onClose={() => setShowDeleteModal(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
