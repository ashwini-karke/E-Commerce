import React, { useState } from "react";

const Address: React.FC<{
  nextStep: () => void;
  prevStep: () => void;
  setBill: (bill: any) => void;
}> = ({ nextStep, prevStep, setBill }) => {
  const [address, setAddress] = useState("");

  const handleNext = () => {
    setBill((prev: any) => ({ ...prev, address: "123 Street, City, Country" }));
    nextStep();
  };
  return (
    <div className="address-container">
      <h2>Enter Your Address</h2>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your shipping address..."
      ></textarea>
      <div className="button-group">
        <button className="back-btn" onClick={prevStep}>
          Back to Cart
        </button>
        <button className="next-btn" onClick={handleNext}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Address;
