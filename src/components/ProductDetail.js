import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatEther, parseEther } from 'ethers';
import '../css/ProductDetail.css';

const ProductDetail = ({ state }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { contract } = state;
  const { productId } = useParams();

  useEffect(() => {
    const fetchFruit = async () => {
      try {
        const fruit = await contract.fruits(productId);
        setProduct({
          id: fruit.id.toString(),
          name: fruit.name,
          category: fruit.category,
          price: formatEther(fruit.price.toString()), // Convert price to Ether
          quantity: fruit.quantity.toString(),
          image: fruit.image
        });
        console.log(fruit);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    contract && fetchFruit();
  }, [contract, productId]);

  const handleBuyNow = async () => {
    if (!contract) {
      toast.error("Contract not initialized");
      return;
    }

    if(parseInt(product.quantity) === 0){
      alert("Hết hàng");
      return;
      
    }

    try {
      setLoading(true);
      const priceInWei = parseEther(product.price); // Convert Ether to Wei
      const transaction = await contract.buyFruit(productId, 1, {
        value: priceInWei
      });
      console.log(productId, 1, {
        value: priceInWei
      },product.price)
      await transaction.wait();
      toast.success("Product bought successfully!");
    } catch (error) {
      console.error("Error buying product:", error.message);
      toast.error("Error buying product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!product.id) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: {product.price} ETH</p>
      <p>Quantity Available: {product.quantity}</p>
      <button onClick={handleBuyNow} disabled={loading}>
        {loading ? "Processing..." : "Buy Now"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
