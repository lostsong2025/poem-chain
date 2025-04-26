// frontend/src/utils/security.js
export const security = {
    // XSS 防护
    sanitizeInput: (input) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return input.replace(reg, (match)=>(map[match]));
    },

    // 合约调用安全检查
    validateTransaction: async (tx) => {
        const gasEstimate = await tx.estimateGas();
        if (gasEstimate > CONFIG.CONTRACT.GAS_LIMIT) {
            throw new AppError('Gas limit exceeded', 'GAS_ERROR');
        }
        return true;
    }
};