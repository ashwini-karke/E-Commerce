import React from "react";

const Summary: React.FC<{ prevStep: () => void; bill: { invoice: string; address: string; paymentDetails: string } }> = ({ prevStep, bill }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <p>Invoice: {bill.invoice}</p>
      <p>Address: {bill.address}</p>
      <p>Payment: {bill.paymentDetails}</p>
    </div>
  );
};

export default Summary;
