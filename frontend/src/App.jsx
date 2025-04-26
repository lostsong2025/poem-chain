import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from "./components/Navigation/Navigation";
import Universe from "./components/Universe/Universe";
import { translations } from "./i18n/translations";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contractInfo";
import './App.css';

function App() {
  const [currentLang, setCurrentLang] = useState('en'); // 默认改为英文
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const t = translations[currentLang];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
        const poemContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        const address = await signer.getAddress();
        setAccount(address);
        setContract(poemContract);

        console.log("Connected to:", address);
        console.log("Contract at:", CONTRACT_ADDRESS);
      } else {
        console.error("Please install MetaMask!");
      }
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
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}

export default App;
