// frontend/src/components/Navigation/Navigation.jsx
import React from 'react';
import LanguageSwitch from './LanguageSwitch';
import './Navigation.css';

const Navigation = ({ t, currentLang, onLanguageChange, account, connectWallet }) => {
  return (
    <nav className="navigation">
      <div className="nav-logo">
        {t.logo.text}
      </div>
      <div className="nav-links">
        <a href="/" className="nav-link">{t.nav.home}</a>
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