import React, { useState } from 'react';
import { addFruit } from "../utils/contractServices";
import '../css/Admin.css';

const Admin = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: '' // Changed from `null` to `''`
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Call getFruits to check the current fruits
    try {
      // Call the addFruit function from contractServices
      await addFruit(product.name, product.category, product.price, product.quantity, product.image);

      // Reset form after adding product
      setProduct({
        name: '',
        category: '',
        price: '',
        quantity: '',
        image: ''
      });

    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="admin-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
