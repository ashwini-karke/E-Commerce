import React from "react";
import Payment from './Payment';

const Summary: React.FC<{
  prevStep: () => void;
  bill: {
    invoice: string;
    address: string;
    paymentDetails: string;
    cart: {
      name: string;
      price: number;
      quantity: number;
    }[]; // Updated structure for cart items
  };
}> = ({ prevStep, bill }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <p className="summary-items"><h3>Invoice:</h3> {bill.invoice}</p>
      <p className="products summary-items">
        <h3>Cart Items:</h3>
        {bill.cart.map((item, index) => (
          <span key={index}>
            {item.name} (x{item.quantity}) - ₹ {item.price * item.quantity}
          </span>
        ))}
      </p>
      <p className="summary-items"><h3>Address:</h3> {bill.address}</p>
      <p className="summary-items"><h3>Payment:</h3> {bill.paymentDetails}</p>
    </div>
  );
};

export default Summary;
