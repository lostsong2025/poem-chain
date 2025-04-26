import React from 'react';
import './Navigation.css';

function Navigation({ account, connectWallet, language }) {
  const texts = {
    en: {
      home: 'Home',
      myPoems: 'My Poems',
      createPoem: 'Create Poem',
      connectWallet: 'Connect Wallet'
    },
    zh: {
      home: '首页',
      myPoems: '我的诗歌',
      createPoem: '创作诗歌',
      connectWallet: '连接钱包'
    }
  };

  const t = texts[language];  // 获取当前语言的文本

  return (
    <nav className="navigation">
      <div className="nav-buttons">
        <button className="nav-button active">
          {t.home}
        </button>
        <button className="nav-button">
          {t.myPoems}
        </button>
        <button className="nav-button">
          {t.createPoem}
        </button>
        {account ? (
          <span className="wallet-display">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
        ) : (
          <button className="nav-button" onClick={connectWallet}>
            {t.connectWallet}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
