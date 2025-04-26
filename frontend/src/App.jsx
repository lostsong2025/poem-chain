import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import Universe from './components/Universe/Universe';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import PoemChainABI from './contracts/PoemChain.json';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [language, setLanguage] = useState('en');
  const { i18n } = useTranslation();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const contractInstance = new ethers.Contract(
          contractAddress,
          PoemChainABI.abi,
          signer
        );

        setAccount(accounts[0]);
        setContract(contractInstance);
      } else {
        console.log('Please install MetaMask');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="app">
      <Navigation 
        account={account}
        connectWallet={connectWallet}
        language={language}
        setLanguage={setLanguage}
      />
      <Universe 
        account={account}
        contract={contract}
        connectWallet={connectWallet}
      />
    </div>
  );
}

export default App;
