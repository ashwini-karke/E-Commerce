// DeleteProductModal.tsx
import React, { useState } from "react";
import { deleteProduct } from "../services/productService";

interface ModalProps {
  onClose: () => void;
}

const DeleteProductModal: React.FC<ModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productId = formData.id;

      // Call the API function
      const response = await deleteProduct(productId);
      console.log("Product Added Successfully:", response);

      // Close modal or reset form if needed
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="product-modal-label">Add Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="id"
            placeholder="Product ID"
            required
            onChange={handleChange}
          />
          <button type="submit">Delete Product</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
