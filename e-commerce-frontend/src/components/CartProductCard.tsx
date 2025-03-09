import React from "react";
import { addToCart } from "../services/cartService";

interface CartProductCardProps {
  product: {
    product: string; // Product ID
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  updateQuantity: (productId: string, quantity: number) => void; // Modify quantity in parent
  removeFromCart: (productId: string) => void; // Remove from parent
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  product,
  updateQuantity,
  removeFromCart,
}) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (isNaN(newQuantity) || newQuantity < 0) return; // Ensure valid input

    if (newQuantity === 0) {
      removeFromCart(product.product); // Remove item from parent state
    } else {
      if (newQuantity > product.quantity) {
        // Quantity increased, call addProduct API
        addToCart({
          _id: product.product,
          name: product.name,
          price: product.price,
          description: "", // Add appropriate description
          category: "", // Add appropriate category
          image: product.image,
        });
      }
      updateQuantity(product.product, newQuantity);
    }
  };

  return (
    <div className="cart-card">
      <div className="details">
        <div className="details-container">
          <div>
            <img src={product.image} alt={product.name} />
          </div>
          <div className="price-quantity">
            <h3>{product.name}</h3>
            <div className="price-container">
              <p>Price: ₹{product.price.toFixed(2)}</p>
              <input
                type="number"
                min="0"
                value={product.quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => removeFromCart(product.product)}>X Remove</button>
    </div>
  );
};

export default CartProductCard;
