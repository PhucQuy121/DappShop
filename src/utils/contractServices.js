import FruitShop_API from "./FruitShop.json";
import Lock_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

// Module-level variables to store provider, signer, and contract
let provider;
let signer;
let contract;
let contractFruitShop;

// Function to initialize the provider, signer, and contract
const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer);
    contractFruitShop = new Contract(CONTRACT_ADDRESS, FruitShop_API, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

// Initialize once when the module is loaded
initialize();

// Function to request single account
export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0]; // Return the first account
  } catch (error) {
    console.error("Error requesting account:", error.message);
    return null;
  }
};
// Function to get contract balance in ETH
export const getContractBalanceInETH = async () => {
  const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
  const balanceEth = formatEther(balanceWei); // Convert Wei to ETH string
  return balanceEth; // Convert ETH string to number
};

// Function to deposit funds to the contract
export const depositFund = async (depositValue) => {
  console.log("Helo: ", depositValue)
  const ethValue = parseEther(depositValue);
  const deposit = await contract.deposit({ value: ethValue });
  await deposit.wait();
};

// Function to withdraw funds from the contract
export const withdrawFund = async () => {
  const withdrawTx = await contract.withdraw();
  await withdrawTx.wait();
  console.log("Withdrawal successful!");
};

export const register = async () => {
  const withdrawTx = await contract.withdraw();
  await withdrawTx.wait();
  console.log("Withdrawal successful!");
};


export const isRegistered = async () => {
  const withdrawTx = await contract.withdraw();
  await withdrawTx.wait();
  console.log("Withdrawal successful!");
};

// Function to add a new fruit
export const addFruit = async (name, category, price, quantity, image) => {
  if (!contractFruitShop) {
    console.error("Contract not initialized.");
    return;
  }

  try {
    const tx = await contractFruitShop.addFruit(name, category, price, quantity, image);
    await tx.wait();
    
    const updatedFruits = await contractFruitShop.getFruits();
    console.log("Fruit added successfully: ", updatedFruits);
  } catch (error) {
    console.error("Error adding fruit:", error.message);
  }
};

export const getFruits = async () => {
  if (!contractFruitShop) {
    console.error("Contract not initialized.");
    return;
  }

  try {
    const updatedFruits = await contractFruitShop.getFruits();
    console.log("Fetched fruits:", updatedFruits); // In ra dữ liệu trả về
    // Nếu muốn kiểm tra từng phần tử
    updatedFruits.forEach((fruit, index) => {
      console.log(`Fruit ${index}:`, fruit.name);
    });
    return updatedFruits;
  } catch (error) {
    console.error("Error fetching fruits:", error.message);
  }
};



export const buyFruit = async (fruitId, quantity, price) => {
  console.log(contractFruitShop);
  const ethValue = parseEther(price.toString());
  const buyFruitTx = await contractFruitShop.buyFruit(fruitId, quantity, { value: ethValue });
  await buyFruitTx.wait();
  console.log("Fruit purchased successfully!");
};

