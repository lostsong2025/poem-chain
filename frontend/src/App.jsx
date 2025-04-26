import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Universe from './components/Universe/Universe';
import Navigation from './components/Navigation/Navigation';
import PoemChainABI from './contracts/PoemChain.json';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

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
    const checkWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            connectWallet();
          }
        } catch (error) {
          console.error('Error checking wallet:', error);
        }
      }
    };

    checkWallet();
  }, []);

  return (
    <div className="app">
      <Universe />
      <Navigation 
        account={account}
        connectWallet={connectWallet}
      />
    </div>
  );
}

export default App;
