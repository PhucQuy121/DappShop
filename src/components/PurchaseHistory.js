// src/pages/PurchaseHistory.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/PurchaseHistory.css';

const PurchaseHistory = ({ contract, account }) => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const history = await contract.getPurchaseHistory(account);

        const detailedPurchases = await Promise.all(
            history.map(async (purchase) => {
              const fruit = await contract.getFruit(purchase.fruitId);
              return {
                ...purchase,
                fruit,
              };
            })
          );
        setPurchases(detailedPurchases);
      } catch (error) {
        console.error("Error fetching purchase history:", error.message);
        toast.error("Error fetching purchase history: " + error.message);
      }
    };

    contract && fetchPurchaseHistory();
  }, [account, contract]);

  return (
    <div className="purchase-history">
      <h2>Purchase History</h2>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button> {/* Nút quay về trang chủ */}
      {purchases.length === 0 ? (
        <p>No purchase history available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.fruit.name}</td>
                <td>
                  <img src={purchase.fruit.image} alt={purchase.fruit.name} className="product-image" />
                </td>
                <td>${parseInt(purchase.fruit.price)}</td>
                <td>{parseInt(purchase[1])}</td>
                <td>{new Date(Number(purchase[2]) * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PurchaseHistory;
