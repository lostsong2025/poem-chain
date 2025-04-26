// frontend/src/components/Universe/Universe.jsx
import React, { useState, useEffect } from 'react';
import { poemService } from '../../services/poemService';
import './Universe.css';

const Universe = () => {
    // 状态管理
    const [currentView, setCurrentView] = useState('home'); // 'home', 'create', 'myPoems'
    const [language, setLanguage] = useState('zh'); // 'zh', 'en'
    const [searchQuery, setSearchQuery] = useState('');
    const [myPoems, setMyPoems] = useState([]);
    const [newPoem, setNewPoem] = useState({ 
        title: '', 
        content: '', 
        isPublic: true 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(0);
    const [poemGroups, setPoemGroups] = useState([]);
    const [account, setAccount] = useState(null);

    // 语言配置
    const translations = {
        zh: {
            home: '首页',
            myPoems: '我的诗歌',
            createPoem: '创建诗歌',
            search: '搜索',
            title: '标题',
            content: '内容',
            submit: '提交',
            searchPlaceholder: '搜索诗歌...'
        },
        en: {
            home: 'Home',
            myPoems: 'My Poems',
            createPoem: 'Create Poem',
            search: 'Search',
            title: 'Title',
            content: 'Content',
            submit: 'Submit',
            searchPlaceholder: 'Search poems...'
        }
    };

    // 添加标语翻译
    const sloganTranslations = {
        zh: "每个真正的诗人都在书写无人能写的诗",
        en: "Every true poet writes what no one else can write"
    };

    // 增加更多诗句
    const floatingPoems = [
        // 中文诗句
        { text: "人生若只如初见", lang: "zh" },
        { text: "何事秋风悲画扇", lang: "zh" },
        { text: "古今多少事，都付笑谈中", lang: "zh" },
        { text: "桃花坞里桃花庵，桃花庵下桃花仙", lang: "zh" },
        { text: "青山依旧在，几度夕阳红", lang: "zh" },
        { text: "春江潮水连海平，海上明月共潮生", lang: "zh" },
        { text: "君不见黄河之水天上来，奔流到海不复回", lang: "zh" },
        { text: "白日依山尽，黄河入海流", lang: "zh" },
        { text: "明月几时有，把酒问青天", lang: "zh" },
        { text: "床前明月光，疑是地上霜", lang: "zh" },
        { text: "举头望明月，低头思故乡", lang: "zh" },
        { text: "千山鸟飞绝，万径人踪灭", lang: "zh" },
        { text: "孤舟蓑笠翁，独钓寒江雪", lang: "zh" },
        { text: "云想衣裳花想容，春风拂槛露华浓", lang: "zh" },
        { text: "停车坐爱枫林晚，霜叶红于二月花", lang: "zh" },
        
        // 英文诗句
        { text: "To be, or not to be", lang: "en" },
        { text: "A thing of beauty is a joy forever", lang: "en" },
        { text: "Two roads diverged in a wood", lang: "en" },
        { text: "Because I could not stop for Death", lang: "en" },
        
        // 法文诗句
        { text: "Les feuilles mortes se ramassent à la pelle", lang: "fr" },
        { text: "La vie est brève, l'art est long", lang: "fr" },
        
        // 日文诗句
        { text: "さくら さくら", lang: "ja" },
        { text: "月が綺麗ですね", lang: "ja" },
        { text: "花の命は短くて", lang: "ja" },
        
        // 韩文诗句
        { text: "나그네", lang: "ko" },
        { text: "달빛이 아름답다", lang: "ko" },
        
        // 西班牙文诗句
        { text: "La vida es sueño", lang: "es" },
        { text: "Caminante, no hay camino", lang: "es" },
        
        // 更多中文诗句
        { text: "欲穷千里目，更上一层楼", lang: "zh" },
        { text: "海内存知己，天涯若比邻", lang: "zh" },
        { text: "落霞与孤鹜齐飞，秋水共长天一色", lang: "zh" },
        { text: "会当凌绝顶，一览众山小", lang: "zh" },
        { text: "人间四月芳菲尽，山寺桃花始盛开", lang: "zh" }
    ];

    // 初始化Web3和合约
  useEffect(() => {
        const initializeContract = async () => {
            try {
                // 直接使用合约地址
                const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
                console.log('Contract address:', contractAddress);
                
                if (!contractAddress) {
                    throw new Error('Contract address not found');
                }

                await poemService.init(contractAddress);
                console.log('PoemService initialized successfully');
                
                await fetchUserPoems();
                setAccount(poemService.account);
            } catch (error) {
                console.error('Initialization error:', error);
                setError(error.message);
            }
        };

        initializeContract();
    }, []);

    // 获取用户诗歌
    const fetchUserPoems = async () => {
        if (!poemService.contract) {
            console.error('Contract not initialized');
      return;
    }

        setIsLoading(true);
        try {
            const poems = await poemService.getUserPoems();
            setMyPoems(poems);
        } catch (error) {
            console.error('Failed to fetch poems:', error);
            setError('Failed to fetch poems');
        } finally {
            setIsLoading(false);
        }
    };

    // 创建诗歌
    const handleCreatePoem = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await poemService.createPoem(
                newPoem.title,
                newPoem.content,
                newPoem.isPublic
            );
            setNewPoem({ title: '', content: '', isPublic: true });
            // 刷新用户诗歌列表
            await fetchUserPoems();
            setCurrentView('myPoems');
        } catch (error) {
            setError('Failed to create poem');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // 搜索诗歌
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setIsLoading(true);
        try {
            const results = await poemService.searchPoems(searchQuery);
            // 处理搜索结果...
            console.log(results);
    } catch (error) {
            setError('Search failed');
            console.error(error);
    } finally {
            setIsLoading(false);
        }
    };

    // 使用 useEffect 监听动画结束并重新生成诗句
    useEffect(() => {
        const interval = setInterval(() => {
            // 每30秒重新生成一批诗句
            setKey(prevKey => prevKey + 1);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    // 初始化两组诗句
    useEffect(() => {
        const initializePoemGroups = () => {
            const group1 = floatingPoems.map((poem, index) => ({
                ...poem,
                id: `group1-${index}`,
                top: `${(index * 3) % 95 + 2}%`,
                delay: `${index * 2}s`
            }));

            const group2 = floatingPoems.map((poem, index) => ({
                ...poem,
                id: `group2-${index}`,
                top: `${(index * 3) % 95 + 2}%`,
                delay: `${30 + index * 2}s`
            }));

            setPoemGroups([...group1, ...group2]);
        };

        initializePoemGroups();
    }, []);

    // 添加缩短地址的函数
    const shortenAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const generateRandomPoemStyle = () => {
        const speed = 30 + Math.random() * 40; // 30-70秒的随机速度
        const startPosition = Math.random() * 100; // 随机起始位置
        const scale = 0.8 + Math.random() * 0.4; // 随机大小
        const opacity = 0.3 + Math.random() * 0.3; // 随机透明度
        const verticalMove = -20 + Math.random() * 40; // 随机垂直移动范围

        return {
            animationDuration: `${speed}s`,
            top: `${Math.random() * 90}%`,
            transform: `scale(${scale})`,
            opacity,
            animationName: `float-${Math.floor(Math.random() * 3)}` // 使用多个不同的动画
        };
    };

    // 创建多个不同的飘动动画
    const floatingAnimations = `
        @keyframes float-0 {
            0% {
                transform: translateX(100vw) translateY(0);
                opacity: 0;
            }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% {
                transform: translateX(-100vw) translateY(20px);
                opacity: 0;
            }
        }

        @keyframes float-1 {
            0% {
                transform: translateX(100vw) translateY(0);
                opacity: 0;
            }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% {
                transform: translateX(-100vw) translateY(-20px);
                opacity: 0;
            }
        }

        @keyframes float-2 {
            0% {
                transform: translateX(100vw) translateY(0);
                opacity: 0;
            }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% {
                transform: translateX(-100vw) translateY(0);
                opacity: 0;
            }
        }
    `;

    // 添加加载状态和错误提示的渲染
    if (error) {
    return (
            <div className="error-message">
                {error}
                <button onClick={() => setError(null)}>Dismiss</button>
      </div>
    );
  }

    return (
        <div className="universe-container">
            <style>{floatingAnimations}</style>
            <div className="floating-poems">
                {floatingPoems.map((poem, index) => (
                    <div
                        key={`${poem.text}-${index}`}
                        className={`floating-poem ${poem.lang}`}
                        style={generateRandomPoemStyle()}
                    >
                        {poem.text}
                    </div>
                ))}
            </div>

            {/* 中心标题 */}
            <h1 className="center-title">
                {language === 'zh' ? '诗链' : 'Poem Chain'}
            </h1>

            {/* 语言切换 */}
            <div className="language-switch">
                <button 
                    className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
                    onClick={() => setLanguage('zh')}
                >
                    中
                </button>
                <button 
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                >
                    En
                </button>
            </div>

            {/* 主要内容区域 */}
            <div className="main-content">
                {currentView === 'create' && (
                    <div className="poem-modal">
                        <form onSubmit={handleCreatePoem}>
                            <input
                                type="text"
                                value={newPoem.title}
                                onChange={(e) => setNewPoem({...newPoem, title: e.target.value})}
                                placeholder="请输入诗歌标题..."
                            />
                            
                            <textarea
                                value={newPoem.content}
                                onChange={(e) => setNewPoem({...newPoem, content: e.target.value})}
                                placeholder="请输入诗歌内容..."
                            />
                            
                            <div className="visibility-toggle">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newPoem.isPublic}
                                        onChange={(e) => setNewPoem({...newPoem, isPublic: e.target.checked})}
                                    />
                                    公开诗歌
                                </label>
                            </div>
                            
                            <button type="submit">
                                {isLoading ? '发布中...' : '发布诗歌'}
                            </button>
                        </form>
                    </div>
                )}

                {currentView === 'myPoems' && (
                    <MyPoems poems={myPoems} />
                )}
      </div>

            {/* 底部导航栏 */}
            <div className="bottom-nav">
                <div className="nav-container">
                    {/* 左侧区域 - Slogan */}
                    <div className="left-section">
                        <div className="slogan">
                            {language === 'zh' ? 
                                "每个真正的诗人都在书写无人能写的诗" : 
                                "Every true poet writes what no one else can write"
                            }
                        </div>
                    </div>

                    {/* 中间区域 - 导航按钮 */}
                    <div className="center-section">
                        <button className="nav-button">
                            {translations[language].home}
                        </button>
                        
                        <button className="nav-button">
                            {translations[language].myPoems}
                        </button>
                        
                        <button className="nav-button">
                            {translations[language].createPoem}
                        </button>
                    </div>

                    {/* 右侧区域 - 搜索和钱包 */}
                    <div className="right-section">
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder={translations[language].searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            
                            <button className="nav-button">
                                {translations[language].search}
                            </button>
                        </div>

                        {account && (
                            <div className="wallet-address">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
      </div>
    );
};

const MyPoems = ({ poems }) => {
    // 添加时间戳转换函数
    const formatTimestamp = (timestamp) => {
        // 确保转换为数字类型
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleDateString();
    };

  return (
        <div className="my-poems-container">
            {poems.length === 0 ? (
                <div className="empty-state">
                    还没有创作诗歌，开始创作你的第一首诗吧！
                </div>
            ) : (
                <div className="poems-list">
                    {poems.map((poem, index) => (
                        <div key={index} className="poem-card">
                            <h2 className="poem-title">{poem.title}</h2>
                            <div className="poem-content">{poem.content}</div>
                            <div className="poem-meta">
                                <span className="poem-date">
                                    {formatTimestamp(poem.timestamp)}
              </span>
                                <span className="visibility-badge">
                                    {poem.isPublic ? '公开' : '私密'}
              </span>
            </div>
          </div>
        ))}
      </div>
            )}
    </div>
  );
};

export default Universe;