import React from "react";
import { requestAccount } from "../utils/contractServices";

function ConnectWalletButton({ setAccount }) {
  const connectWallet = async () => {
    try {
      const account = await requestAccount();
      setAccount(account);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return <button onClick={connectWallet}>Kết nối ví</button>;
}

export default ConnectWalletButton;
