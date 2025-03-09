import React, { useEffect, useState } from "react";

interface ProductCardProps {
  _id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
  addToCart: (product: Omit<ProductCardProps, "addToCart">) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  name,
  price,
  description,
  category,
  image,
  addToCart,
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLike = localStorage.getItem(`liked_${_id}`);
    if (storedLike) {
      setLiked(JSON.parse(storedLike));
    }
  }, [_id]);

  const toggleLike = () => {
    const updatedLiked = !liked;
    setLiked(updatedLiked);
    localStorage.setItem(`liked_${_id}`, JSON.stringify(updatedLiked));
  };

  return (
    <div className="product-card">
      <div
        className="like-button"
        onClick={toggleLike}
        style={{ cursor: "pointer" }}
      >
        {liked ? "❤️" : "🤍"}
      </div>

      <img src={image} alt={name} className="product-image" />

      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <span className="product-price">₹{price}</span>
      </div>

      <p className="product-description">{description}</p>

      <span className="product-category">{category}</span>

      <button
        className="add-to-cart-button"
        onClick={() =>
          addToCart({ _id, name, price, description, category, image })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
