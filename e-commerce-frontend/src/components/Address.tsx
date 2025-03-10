import React, { useState } from "react";

const Payment: React.FC<{
  nextStep: () => void;
  prevStep: () => void;
  setBill: (bill: any) => void;
}> = ({ nextStep, prevStep, setBill }) => {
  const [selectedPayment] = useState("Credit/Debit Card");
  const [address, setAddress] = useState(""); // State to store the address
  const [addressError, setAddressError] = useState(""); // State to store error message for address validation

  const handleNext = () => {
    if (!address) {
      setAddressError("Address is required"); // Show error if address is empty
      return; // Prevent proceeding if address is not filled
    }

    setBill((prev: any) => ({ ...prev, paymentDetails: selectedPayment, address }));
    nextStep();
  };

  return (
    <div className="payment-container">
      <div className="address-container">
        <label htmlFor="address">Enter Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
        />
        {addressError && <p className="error-message">{addressError}</p>} {/* Show error message */}
      </div>

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
