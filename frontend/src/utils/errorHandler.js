// frontend/src/utils/errorHandler.js
export class AppError extends Error {
    constructor(message, code, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
}

export const errorHandler = {
    handle: (error, context = {}) => {
        console.error('Error occurred:', {
            message: error.message,
            code: error.code,
            context,
            timestamp: new Date().toISOString()
        });

        // 可以在这里添加错误上报逻辑
        if (process.env.NODE_ENV === 'production') {
            // 发送到错误追踪服务
        }

        return {
            userMessage: getUserFriendlyMessage(error.code),
            error: error
        };
    }
};

const getUserFriendlyMessage = (errorCode) => {
    const messages = {
        'NETWORK_ERROR': '网络连接失败，请检查您的网络设置',
        'CONTRACT_ERROR': '合约调用失败，请稍后重试',
        'WALLET_ERROR': '钱包连接失败，请确保已安装 MetaMask',
        'DEFAULT': '操作失败，请稍后重试'
    };
    return messages[errorCode] || messages.DEFAULT;
};