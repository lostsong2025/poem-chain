import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from "./components/Navigation/Navigation";
import Universe from "./components/Universe/Universe";
import { translations } from "./i18n/translations";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contractInfo";
import './App.css';

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const t = translations[currentLang];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
  };

  const connectWallet = async () => {
    try {
      // 使用 MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      
      // 创建合约实例
      const poemContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // 获取地址
      const address = await signer.getAddress();
      setAccount(address);
      setContract(poemContract);

      console.log("Connected to:", address);
      console.log("Contract at:", CONTRACT_ADDRESS);

    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="app">
      <nav className="nav-bar">
        <div className="nav-left">每个真正的诗人都在书写无人能写的诗</div>
        <div className="nav-center">
          <span>首页</span>
          <span>我的诗歌</span>
          <span>创建诗歌</span>
        </div>
        <div className="nav-right">
          <input type="text" placeholder="搜索诗歌..." />
          <button className="search-btn">搜索</button>
          <span className="wallet-address">
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : '连接钱包'}
          </span>
        </div>
      </nav>
      <main className="main-content">
        <Universe 
          contract={contract}
          account={account}
        />
      </main>
    </div>
  );
}

export default App;
