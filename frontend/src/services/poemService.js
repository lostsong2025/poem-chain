import Web3 from 'web3';
import { POEM_CHAIN_ABI } from '../contracts/PoemChain';

// 修改为 export class
export class PoemService {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.contractAddress = null;
    }

    // 初始化Web3和合约
    async init(contractAddress) {
        if (!contractAddress) {
            throw new Error('Contract address is required');
        }
        
        console.log('Initializing with contract address:', contractAddress);
        this.contractAddress = contractAddress;

        if (window.ethereum) {
            try {
                // 请求连接钱包
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // 使用 HTTP Provider 而不是 WebSocket
                this.web3 = new Web3(window.ethereum);
                
                // 检查网络并尝试切换到本地网络
                const chainId = await this.web3.eth.getChainId();
                console.log('Current chain ID:', chainId);

                // Hardhat 本地网络的 chainId 是 31337
                if (chainId !== 31337) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x7A69' }], // 31337 的十六进制
                        });
                    } catch (switchError) {
                        // 如果网络不存在，添加网络
                        if (switchError.code === 4902) {
                            try {
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [{
                                        chainId: '0x7A69',
                                        chainName: 'Hardhat Local',
                                        nativeCurrency: {
                                            name: 'ETH',
                                            symbol: 'ETH',
                                            decimals: 18
                                        },
                                        rpcUrls: ['http://127.0.0.1:8545']
                                    }]
                                });
                            } catch (addError) {
                                throw new Error('Failed to add Hardhat network');
                            }
                        }
                        throw new Error('Failed to switch to Hardhat network');
                    }
                }

                // 初始化合约
                this.contract = new this.web3.eth.Contract(
                    POEM_CHAIN_ABI, 
                    this.contractAddress
                );
                
                // 获取账户
                const accounts = await this.web3.eth.getAccounts();
                this.account = accounts[0];
                console.log('Connected account:', this.account);

                // 验证合约代码
                const code = await this.web3.eth.getCode(this.contractAddress);
                if (code === '0x') {
                    throw new Error('No contract code at specified address');
                }

                return true;
            } catch (error) {
                console.error('Initialization error:', error);
                throw error;
            }
        } else {
            throw new Error('Please install MetaMask!');
        }
    }

    // 创建诗歌
    async createPoem(title, content, isPublic = true) {
        if (!this.contract || !this.contractAddress) {
            throw new Error('Contract not initialized');
        }

        try {
            console.log('Creating poem:', { title, content, isPublic });
            const result = await this.contract.methods
                .createPoem(title, content, isPublic)
                .send({ from: this.account });
            console.log('Poem created:', result);
            return result;
        } catch (error) {
            console.error('Create poem error:', error);
            throw error;
        }
    }

    // 获取用户诗歌
    async getUserPoems() {
        if (!this.contract || !this.contractAddress) {
            throw new Error('Contract not initialized');
        }

        try {
            console.log('Fetching poems using getMyPoems...');
            const result = await this.contract.methods
                .getMyPoems()
                .call({
                    from: this.account
                });
            
            console.log('Raw result:', result);
            
            // 将返回的数据转换为poems数组
            const poems = result.titles.map((title, index) => ({
                title: title,
                content: result.contents[index],
                timestamp: result.timestamps[index],
                id: result.ids[index],
                isPublic: result.isPublicList[index]
            }));
            
            console.log('Processed poems:', poems);
            return poems;
        } catch (error) {
            console.error('Get user poems error:', error);
            throw error;
        }
    }

    // 搜索诗歌
    async searchPoems(keyword) {
        if (!this.contract || !this.contractAddress) {
            throw new Error('Contract not initialized');
        }

        try {
            console.log('Searching poems with keyword:', keyword);
            const results = await this.contract.methods
                .searchPoems(keyword)
                .call();
            console.log('Search results:', results);
            return results;
        } catch (error) {
            console.error('Search poems error:', error);
            throw error;
        }
    }
}

// 创建并导出实例
export const poemService = new PoemService();