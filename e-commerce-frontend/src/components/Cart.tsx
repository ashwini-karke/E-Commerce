import React, { useEffect, useState } from "react";
import CartProductCard from "./CartProductCard";
import { clearCart, fetchCart, removeCartItem } from "../services/cartService";
import Invoice from "./Invoice";

interface CartItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string;
}

const Cart: React.FC<{
  nextStep: () => void;
  setBill: (bill: any) => void;
}> = ({ nextStep, setBill }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleNext = () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    const timestamp = Date.now(); // Get current timestamp
    const invoiceNumber = parsedUser.id
      ? `INV-${parsedUser.id}-${timestamp}`
      : `INV-${timestamp}`; // Generate unique invoice number

    setBill((prev: any) => ({ ...prev, invoice: invoiceNumber, cart:cart }));
    nextStep();
  };

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await fetchCart();

      if (response && response.items) {
        setCart(response.items);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeCartItem(productId);
      setCart((prevCart) =>
        prevCart.filter((item) => item.product !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // **Update Quantity and Remove if Zero**
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.product === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items where quantity is 0
    );
  };

  // Clear Cart Function
  const handleClearCart = () => {

    setCart([]);
    clearCart()
  };

  return (
    <div className="cart-container">
      {/* Header with Clear Cart Button */}
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        {cart.length > 0 && (
          <button onClick={handleClearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        )}
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartProductCard
              key={item.product}
              product={item}
              updateQuantity={updateQuantity}
              removeFromCart={handleRemoveFromCart}
            />
          ))}

          {/* Invoice Component (Displayed Below Products) */}
          <Invoice cart={cart} />
          <button className="next-btn" onClick={handleNext}>
            Proceed to Address
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
