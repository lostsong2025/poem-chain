import React from 'react';
import './Universe.css';

const Universe = ({ contract, account, currentLang, connectWallet }) => {
  const translations = {
    zh: {
      title: "诗链",
      slogan: "每个真正的诗人都在书写无人能写的诗",
      home: "首页",
      myPoems: "我的诗歌",
      createPoem: "创建诗歌",
      connectWallet: "连接钱包"
    },
    en: {
      title: "Poem Chain",
      slogan: "Every true poet writes what no one else can write",
      home: "Home",
      myPoems: "My Poems",
      createPoem: "Create Poem",
      connectWallet: "Connect Wallet"
    }
  };

  const t = translations[currentLang];

  return (
    <div className="universe">
      <div className="center-content">
        <h1 className="title">
          {currentLang === 'zh' ? '诗链' : 'Poem Chain'}
        </h1>
        <div className="slogan">{t.slogan}</div>
      </div>

      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-left">
            <button className="nav-button">{t.home}</button>
            <button className="nav-button">{t.myPoems}</button>
            <button className="nav-button">{t.createPoem}</button>
          </div>
          <div className="nav-right">
            {account ? (
              <span className="wallet-address">
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </span>
            ) : (
              <button className="nav-button" onClick={connectWallet}>
                {t.connectWallet}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Universe;
