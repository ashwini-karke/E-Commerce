import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Our E-Commerce Store</h1>
      <Link to="/products">Shop Now</Link>
    </div>
  );
};

export default Home;
