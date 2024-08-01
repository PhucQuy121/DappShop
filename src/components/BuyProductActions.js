import React from "react";
import { buyFruit } from "../utils/contractServices";
import { toast } from "react-toastify";

function BuyProductActions({fruitId, quantity, price}) {

  const handleDeposit = async () => {
    try {
      console.log(String(price))
      // await depositFund(String(price));
      await buyFruit(1, 2, price);
      
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleDeposit}>Buy now</button>
      </div>
      <br />
    </div>
  );
}

export default BuyProductActions;
