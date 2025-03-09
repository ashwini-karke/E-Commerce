import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { getProducts } from "../../services/productService";

interface Product {
  id: string;
  name: string;
  category: string;
}

const ProductList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: Product[] = await getProducts();

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(response.map((product) => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      {/* Display Categories */}
      <h1 className="subheading">Categories</h1>
      <ul className="category-list">
        {/* "All Products" Option */}
        <li className="category-item" onClick={() => navigate("/productdetails/All")}>
          All Products
        </li>
        {/* Render Categories */}
        {categories.map((category, index) => (
          <li key={index} className="category-item" onClick={() => navigate(`/productdetails/${category}`)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
