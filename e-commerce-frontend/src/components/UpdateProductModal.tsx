// UpdateProductModal.tsx
import React, { useState } from "react";
import { updateProduct } from "../services/productService";

interface ModalProps {
  onClose: () => void;
}

const UpdateProductModal: React.FC<ModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productId = formData.id;
      // Convert form data into FormData (for file uploads)
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Ensure 'image' is a File object
      }

      // Call the API function
      const response = await updateProduct(productId, formDataToSend);
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
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit">Update Product</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default UpdateProductModal;
