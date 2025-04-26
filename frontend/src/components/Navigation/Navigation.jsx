import React from 'react';
import { useTranslation } from 'react-i18next';
import './Navigation.css';

function Navigation({ account, connectWallet, language, setLanguage }) {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <h1 className="nav-title">Poetry Chain</h1>
      </div>
      <div className="nav-center">
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
        />
        <button className="search-button">{t('search')}</button>
      </div>
      <div className="nav-right">
        <button className="language-button" onClick={toggleLanguage}>
          {language === 'en' ? '中文' : 'EN'}
        </button>
        {account ? (
          <span className="account-display">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
        ) : (
          <button className="connect-button" onClick={connectWallet}>
            {t('connectWallet')}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
