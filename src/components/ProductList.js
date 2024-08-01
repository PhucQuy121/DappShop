import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ProductList.css';
import Modal from './Modal.js';

const ProductList = ({ products, contract }) => {
  const [showForm, setShowForm] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleBuyNow = async (product) => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    if (quantity > parseInt(product.quantity)) {
      toast.error("Not enough quantity available");
      return;
    }

    try {
      setLoading(true);
      const priceInWei = ethers.parseEther(ethers.formatEther((quantity * parseInt(product.price)).toString())); // Calculate total price in Wei
      console.log(priceInWei)
      console.log(parseInt(product.id), parseInt(quantity))
      const transaction = await contract.buyFruit(parseInt(product.id), parseInt(quantity), {
        value: priceInWei
      });
      await transaction.wait();
      toast.success("Product bought successfully!");
      setQuantity(1); // Reset quantity
      setShowForm(null); // Hide the form after purchase
    } catch (error) {
      console.error("Error buying product:", error.message);
      toast.error("Error buying product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowForm(null);
    setQuantity(1);
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${parseInt(product.price)}</p>
              </div>
            <button className="buy-button" onClick={() => setShowForm(product)}>Buy</button>
          </li>
        ))}
      </ul>

      {showForm && (
        <Modal show={!!showForm} onClose={closeModal}>
          <div className="buy-form">
            <img src={showForm.image} alt={showForm.name} className="buy-form-image" />
            <h3>{showForm.name}</h3>
            <p>Price: {parseInt(showForm.price)} ETH</p>
            <p>Warehouse: {parseInt(showForm.quantity)}</p>
            <label>Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                max={showForm.quantity}
              />
            </label>
            <button onClick={() => handleBuyNow(showForm)} disabled={loading}>
              {loading ? "Processing..." : "Confirm Purchase"}
            </button>
          </div>
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProductList;
