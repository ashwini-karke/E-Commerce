import React from "react";

interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
}

const Invoice: React.FC<{ cart: CartItem[] }> = ({ cart }) => {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="invoice-container">
      <h3 className="invoice-title">Invoice Summary</h3>
      <div className="invoice-details">
        <p>
          <strong>Total Items:</strong>{" "}
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
