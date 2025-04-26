import React from 'react';
import './Universe.css';

const Universe = ({ contract, account, currentLang, onLanguageChange }) => {
  const translations = {
    zh: {
      title: "诗链",
      slogan: "每个真正的诗人都在书写无人能写的诗",
      home: "首页",
      myPoems: "我的诗歌",
      createPoem: "创建诗歌",
      search: "搜索",
      searchPlaceholder: "搜索诗歌...",
      connectWallet: "连接钱包"
    },
    en: {
      title: "Poem Chain",
      slogan: "Every true poet writes what no one else can write",
      home: "Home",
      myPoems: "My Poems",
      createPoem: "Create Poem",
      search: "Search",
      searchPlaceholder: "Search poems...",
      connectWallet: "Connect Wallet"
    }
  };

  const t = translations[currentLang];

  return (
    <div className="universe">
      <div className="center-content">
        <h1 className="title">
          <div className="title-line">{currentLang === 'zh' ? '诗' : 'Poem'}</div>
          <div className="title-line">{currentLang === 'zh' ? '链' : 'Chain'}</div>
        </h1>
        <div className="slogan">{t.slogan}</div>
      </div>

      <div className="language-switch">
        <button 
          className={`lang-btn ${currentLang === 'zh' ? 'active' : ''}`}
          onClick={() => onLanguageChange('zh')}
        >
          中
        </button>
        <button 
          className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
          onClick={() => onLanguageChange('en')}
        >
          EN
        </button>
      </div>

      <nav className="nav-bar">
        <div className="nav-center">
          <button className="nav-button">{t.home}</button>
          <button className="nav-button">{t.myPoems}</button>
          <button className="nav-button">{t.createPoem}</button>
        </div>
        <div className="nav-right">
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder={t.searchPlaceholder} 
            />
            <button className="search-button">{t.search}</button>
          </div>
          {account ? (
            <span className="wallet-address">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </span>
          ) : (
            <button className="connect-button" onClick={connectWallet}>
              {t.connectWallet}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Universe;
