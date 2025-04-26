import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from "./components/Navigation/Navigation";
import Universe from "./components/Universe/Universe";
import { translations } from "./i18n/translations";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contractInfo";
import './App.css';

function App() {
  const [currentLang, setCurrentLang] = useState('zh');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const t = translations[currentLang];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
  };

  const connectWallet = async () => {
    try {
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
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="app">
      <main className="main-content">
        <Universe 
          contract={contract}
          account={account}
          currentLang={currentLang}
          t={t}
        />
      </main>
      <Navigation 
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        account={account}
        connectWallet={connectWallet}
      />
    </div>
  );
}

export default App;
