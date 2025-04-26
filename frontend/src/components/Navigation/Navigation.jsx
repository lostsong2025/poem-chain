import React from 'react';
import { useTranslation } from 'react-i18next';
import './Navigation.css';

function Navigation({ account, connectWallet, language, setLanguage }) {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <div className="nav-right">
        <button className="language-switch" onClick={toggleLanguage}>
          {language === 'en' ? '中文' : 'EN'}
        </button>
        {account && (
          <span className="account-display">
            {formatAddress(account)}
          </span>
        )}
      </div>
      <nav className="navigation">
        <div className="nav-left">
          <button className="nav-button active">Home</button>
          <button className="nav-button">My Poems</button>
          <button className="nav-button">Create Poem</button>
          {!account && (
            <button className="nav-button active" onClick={connectWallet}>
              {t('connectWallet')}
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
