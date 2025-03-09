import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productService";
import "./index.css";
import { addToCart } from "../../services/cartService";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.split("/").pop(); // Extract last part of the route
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();

        // Show all products if category is "All", otherwise filter by category
        const filteredProducts =
          category?.toLowerCase() === "all"
            ? response
            : response.filter(
                (product: Product) =>
                  product.category.toLowerCase() === category?.toLowerCase()
              );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const addingToCart = async (product: Product) => {
    try {
      // Call the backend API
      const response = await addToCart(product);

      if (response.status === 200) {
        // Update state only if the API call is successful
        setCart((prevCart) => [...prevCart, product]);
        console.log("Cart Updated:", [...cart, product]); // Debugging
      } else {
        console.error("Failed to add product to cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="product-details-container">
      <h1 className="heading">Category: {category}</h1>
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price.toString()}
              description={product.description}
              category={product.category}
              image={product.image}
              addToCart={(product) => addingToCart({ ...product, price: parseFloat(product.price) })} // Convert price to number and pass to addToCart
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
