import React, { useState } from "react";
import Cart from "../../components/Cart";
import Address from "../../components/Address";
import Payment from "../../components/Payment";
import Summary from "../../components/Summary";
import "./index.css";
import { FaCheck } from "react-icons/fa";

const steps = ["Cart", "Address", "Payment", "Summary"];

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState<any>();

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="checkout-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((label, index) => (
          <div
            key={index}
            className={`progress-step ${
              step > index + 1 || step === steps.length
                ? "completed"
                : step === index + 1
                ? "active"
                : ""
            }`}
          >
            <div className="step-icon">
              {step > index + 1 ? <FaCheck /> : index + 1}
            </div>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Render Components Based on Step */}
      <div className="step-container">
        {step === 1 && <Cart nextStep={nextStep} setBill={setBill} />}
        {step === 2 && (
          <Address nextStep={nextStep} prevStep={prevStep} setBill={setBill} />
        )}
        {step === 3 && (
          <Payment nextStep={nextStep} prevStep={prevStep} setBill={setBill} />
        )}
        {step === 4 && <Summary prevStep={prevStep} bill={bill} />}
      </div>
    </div>
  );
};

export default CheckoutPage;
