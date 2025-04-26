import React from 'react';
import './Universe.css';

const Universe = ({ contract, account, currentLang, onLanguageChange, connectWallet }) => {
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

  // 飘动诗句数组
  const floatingPoems = [
    { text: "人生若只如初见", lang: "zh" },
    { text: "何事秋风悲画扇", lang: "zh" },
    { text: "To be, or not to be", lang: "en" },
    { text: "A thing of beauty is a joy forever", lang: "en" },
    { text: "床前明月光，疑是地上霜", lang: "zh" },
    { text: "举头望明月，低头思故乡", lang: "zh" },
    { text: "Two roads diverged in a wood", lang: "en" },
    { text: "Because I could not stop for Death", lang: "en" }
  ];

  const generateRandomStyle = () => ({
    top: `${Math.random() * 80 + 10}%`,
    animationDuration: `${Math.random() * 20 + 20}s`,
    animationDelay: `${Math.random() * -20}s`
  });

  return (
    <div className="universe">
      {/* 中心内容 */}
      <div className="center-content">
        <h1 className="title">
          <div className="title-line">{currentLang === 'zh' ? '诗' : 'Poem'}</div>
          <div className="title-line">{currentLang === 'zh' ? '链' : 'Chain'}</div>
        </h1>
        <div className="slogan">{t.slogan}</div>
      </div>

      {/* 飘动诗句 */}
      <div className="floating-poems">
        {floatingPoems.map((poem, index) => (
          <div
            key={`${poem.text}-${index}`}
            className={`floating-poem ${poem.lang}`}
            style={generateRandomStyle()}
          >
            {poem.text}
          </div>
        ))}
      </div>

      {/* 语言切换 */}
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

      {/* 底部导航栏 */}
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
