import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from "./components/Navigation/Navigation";
import Universe from "./components/Universe/Universe";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contractInfo";
import './App.css';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [language, setLanguage] = useState('en');

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const poemContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setAccount(accounts[0]);
      setContract(poemContract);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="app-container">
      <button 
        className="language-switch-button"
        onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      >
        {language === 'en' ? '中文' : 'EN'}
      </button>
      <Universe language={language} />
      <Navigation 
        account={account}
        connectWallet={connectWallet}
        language={language}
      />
    </div>
  );
}

export default App;
