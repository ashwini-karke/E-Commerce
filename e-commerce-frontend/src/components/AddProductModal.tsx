// AddProductModal.tsx
import React, { useState } from "react";
import { addProduct } from "../services/productService";

interface ModalProps {
  onClose: () => void;
}

const AddProductModal: React.FC<ModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // Store file object
      }));
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
      // Convert form data into FormData (for file uploads)
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      if (formData.image) {
        formDataToSend.append("image", formData.image); // Append File object
      } else {
        console.error("No image selected");
      }
  
      // Call the API function
      const response = await addProduct(formDataToSend);
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
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
          <button type="submit">Add Product</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;
