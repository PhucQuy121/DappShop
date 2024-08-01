import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Container from './components/Container';
import Login from './components/Login';
import Register from './components/Register';
import PurchaseHistory from './components/PurchaseHistory'; // Import the new component
// import ProductDetail from './components/ProductDetail';
import Admin from './components/Admin'; // Import Admin component
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import FruitShop_API from "./utils/FruitShop.json";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESS } from "./utils/constants";

let provider;
let signer;
let contractFruitShop;
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contractFruitShop: null
  })

  useEffect(() => {
    
    // Function to initialize the provider, signer, and contract
    const initialize = async () => {
      if (typeof window.ethereum !== "undefined") {
        provider = new BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contractFruitShop = new Contract(CONTRACT_ADDRESS, FruitShop_API, signer);
        setState({
          provider: provider,
          signer: signer,
          contract: contractFruitShop
        });
      } else {
        console.error("Please install MetaMask!");
      }
    };

    // Initialize once when the module is loaded
    initialize();
  }, [])
  


  const requestAccount = async () => {
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      return accounts[0]; // Return the first account
    } catch (error) {
      console.error("Error requesting account:", error.message);
      return null;
    }
  };

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  return (
    <Router>
      <div className="App">
      <Routes>
        <Route exact path="/" element={<Container state={state}/>} />
        {/* <Route path="/product/:productId" element={<ProductDetail state={state} addToCart={addToCart}  />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/purchase-history" element={<PurchaseHistory contract={state.contract} account={account} />} /> {/* Add this line */}
      </Routes>
      
      </div>
    </Router>
    // <div className="app">
    //   <Header />
    //   <Container />
    //   <ToastContainer />
    // </div>
  );
}

export default App;
