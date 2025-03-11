import { useState } from "react";
import { updateOrderStatus } from "../services/orderService";

interface Order {
  _id: string;
  invoiceNumber: string;
  items: { _id: string; name: string; quantity: number; price: number }[];
  status: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: string;
}

const OrderCard = ({ order, isAdmin }: { order: Order; isAdmin: boolean }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(order._id, selectedStatus);
      setCurrentStatus(selectedStatus);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Error updating order status!");
    }
  };

  return (
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
        <p className="status">Status: <strong>{currentStatus}</strong></p>
        <p className="shipping">Shipping Address: {order.shippingAddress}</p>
        <p className="total">Total Amount: ₹{order.totalAmount}</p>
        <p className="payment">Payment: {order.paymentDetails}</p>

        {isAdmin && (
          <button className="update-btn" onClick={() => setShowModal(true)}>
            Update Order Status
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Order Status</h2>
            <select
              className="status-dropdown"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default OrderCard;
