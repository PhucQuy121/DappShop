import React, { useEffect, useState } from "react";
import { getContractBalanceInETH } from "../utils/contractServices";

function ContractInfo({ account }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const balanceInETH = await getContractBalanceInETH();
      setBalance(balanceInETH);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Số tiền hiện có là: {balance} ETH</h2>
      <p>Connected Account: {account}</p>
    </div>
  );
}

export default ContractInfo;
