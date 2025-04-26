import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from "./components/Navigation/Navigation";
import Universe from "./components/Universe/Universe";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contractInfo";
import './App.css';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider({
        url: 'http://127.0.0.1:8545',
        chainId: 31337,
        name: 'hardhat'
      });

      const signer = provider.getSigner(0);
      
      const poemContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const address = await signer.getAddress();
      setAccount(address);
      setContract(poemContract);

    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="app">
      <Universe 
        contract={contract}
        account={account}
      />
      <Navigation 
        account={account}
        connectWallet={connectWallet}
      />
    </div>
  );
}

export default App;
