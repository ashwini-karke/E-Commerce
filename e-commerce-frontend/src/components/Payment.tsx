import React from "react";

const Payment: React.FC<{
  nextStep: () => void;
  prevStep: () => void;
  setBill: (bill: any) => void;
}> = ({ nextStep, prevStep, setBill }) => {
  const handleNext = () => {
    setBill((prev: any) => ({ ...prev, paymentDetails: "Paid via Credit Card" }));
    nextStep();
  };
  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <select>
        <option>Credit/Debit Card</option>
        <option>Net Banking</option>
        <option>UPI</option>
        <option>Cash on Delivery</option>
      </select>
      <div className="button-group">
        <button className="back-btn" onClick={prevStep}>
          Back to Address
        </button>
        <button className="next-btn" onClick={handleNext}>
          Proceed to Summary
        </button>
      </div>
    </div>
  );
};

export default Payment;
