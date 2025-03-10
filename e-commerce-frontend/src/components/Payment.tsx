import React, { useState } from "react";
import { createOrder } from "../services/orderService"; // API call for order creation
import { clearCart } from "../services/cartService";

interface PaymentProps {
  nextStep: () => void;
  prevStep: () => void;
  setBill: (bill: any) => void;
}

const Payment: React.FC<PaymentProps> = ({ nextStep, prevStep, setBill }) => {
  const [selectedPayment, setSelectedPayment] =
    useState<string>("Credit/Debit Card");
  const [loading, setLoading] = useState<boolean>(false);

  // Retrieve user details from localStorage
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;
  const userName = parsedUser?.name || "Guest User";
  const userEmail = parsedUser?.email || "guest@example.com";

  // ✅ Format Bill for API
  const formatBill = (bill: any) => {
    if (!bill) return {};

    const calculateTotalAmount = (items: any[]) => {
      return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };

    const totalAmount = calculateTotalAmount(bill.cart);

    return {
      invoiceNumber: bill.invoice || `INV-${Date.now()}`,
      items: bill.cart.map(
        ({ image, ...rest }: { image: string; [key: string]: any }) => rest
      ),
      totalAmount: totalAmount,
      totalAmountPaise: Math.round(totalAmount * 100), // ✅ Convert to paise
      shippingAddress: bill.address || "",
      paymentDetails: selectedPayment,
    };
  };

  // ✅ Process Order
  const processOrder = async (formattedOrder: any) => {
    try {
      setLoading(true);
      console.log("Processing Order:", formattedOrder);
      const response = await createOrder(formattedOrder);
      console.log("Order Created:", response);
      clearCart();
      nextStep();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load Razorpay Script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Handle Razorpay Payment
  const handleRazorpayPayment = async (formattedOrder: any) => {
    const razorpayLoaded = await loadRazorpayScript();

    if (!razorpayLoaded) {
      alert("Failed to load Razorpay!");
      return;
    }

    console.log("Formatted Order for Payment:", formattedOrder);

    const amountInPaise = formattedOrder.totalAmountPaise; // ✅ Use correctly formatted amount

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your Razorpay Test Key
      amount: amountInPaise, // ✅ Amount in paise
      currency: "INR",
      name: "Your Store Name",
      description: "Test Transaction",
      handler: (response: any) => {
        console.log("Payment Successful:", response);

        // ✅ Capture selected payment method correctly
        const actualPaymentMethod = response.method || selectedPayment;
        console.log("Selected Payment Method:", actualPaymentMethod);
        setSelectedPayment(actualPaymentMethod);

        // ✅ Update order with correct payment details
        const updatedOrder = {
          ...formattedOrder,
          paymentId: response.razorpay_payment_id,
          paymentDetails: actualPaymentMethod,
        };

        console.log("Updated Order:", updatedOrder);
        processOrder(updatedOrder);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  // ✅ Handle Payment Flow
  const handleNext = async () => {
    setBill((prev: any) => {
      const updatedBill = { ...prev, paymentDetails: selectedPayment };
      console.log("Updated Bill:", updatedBill);

      const formattedOrder = formatBill(updatedBill);
      console.log("Formatted Order Before Payment:", formattedOrder);

      handleRazorpayPayment(formattedOrder);

      return updatedBill;
    });
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <div className="button-group">
        <button className="back-btn" onClick={prevStep} disabled={loading}>
          Back to Address
        </button>
        <button className="next-btn" onClick={handleNext} disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Payment;
