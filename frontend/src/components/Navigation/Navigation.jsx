// frontend/src/components/Navigation/Navigation.jsx
import React from 'react';
import LanguageSwitch from './LanguageSwitch';
import './Navigation.css';

const Navigation = ({ t, currentLang, onLanguageChange, account, connectWallet }) => {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <div className="slogan">
          {currentLang === 'zh' ? 
            "每个真正的诗人都在书写无人能写的诗" : 
            "Every true poet writes what no one else can write"
          }
        </div>
      </div>
      <div className="nav-center">
        <button className="nav-button">{t.nav.home}</button>
        <button className="nav-button">{t.nav.myPoems}</button>
        <button className="nav-button">{t.nav.createPoem}</button>
      </div>
      <div className="nav-right">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder={t.nav.searchPlaceholder} 
          />
          <button className="search-button">{t.nav.search}</button>
        </div>
        <LanguageSwitch 
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
        />
        {account ? (
          <span className="wallet-address">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
        ) : (
          <button className="connect-button" onClick={connectWallet}>
            {t.nav.connectWallet}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
