import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1>Discover Amazing Deals!</h1>
        <p>Shop the best products at unbeatable prices.</p>
        <Link to="/products" className="btn">Shop Now</Link>
      </section>

      {/* Categories Section */}
      {/* <section className="categories">
        <h2>Shop by Category</h2>
        <div className="home-category-list">
          <Link to="/products?category=electronics">Electronics</Link>
          <Link to="/products?category=clothing">Clothing</Link>
          <Link to="/products?category=footwear">Footwear</Link>
        </div>
      </section> */}

      {/* Newsletter Signup */}
      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to get updates on new products and offers.</p>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>
    </div>
  );
};

export default HomePage;
