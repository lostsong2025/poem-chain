// frontend/src/components/Navigation/LanguageSwitch.jsx
import React from 'react';
import './LanguageSwitch.css';

const LanguageSwitch = ({ currentLang, onLanguageChange }) => {
  return (
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
  );
};

export default LanguageSwitch;