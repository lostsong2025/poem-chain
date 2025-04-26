// frontend/src/config/index.js
export const CONFIG = {
    // 网络配置
    NETWORKS: {
        development: {
            chainId: '0x7A69',
            name: 'Localhost',
            contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            rpcUrl: 'http://localhost:8545'
        },
        testnet: {
            chainId: '0x5',
            name: 'Goerli',
            contractAddress: '', // 测试网合约地址
            rpcUrl: 'https://goerli.infura.io/v3/YOUR-PROJECT-ID'
        },
        mainnet: {
            chainId: '0x1',
            name: 'Ethereum Mainnet',
            contractAddress: '', // 主网合约地址
            rpcUrl: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID'
        }
    },

    // API 配置
    API: {
        INFURA_ID: process.env.VITE_INFURA_ID || '',
        INFURA_SECRET: process.env.VITE_INFURA_SECRET || ''
    },

    // UI 配置
    UI: {
        MAX_POEMS_PER_PAGE: 10,
        SUPPORTED_LANGUAGES: ['zh', 'en'],
        DEFAULT_LANGUAGE: 'zh'
    },

    // 合约配置
    CONTRACT: {
        GAS_LIMIT: 3000000,
        GAS_PRICE: '5000000000' // 5 Gwei
    }
};