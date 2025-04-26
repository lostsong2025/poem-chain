const hre = require("hardhat");

async function main() {
    try {
        console.log("1️⃣ 部署脚本开始...");
        
        // 获取部署账户
        const [deployer] = await hre.ethers.getSigners();
        console.log("使用账户地址:", await deployer.getAddress());
        
        // 获取合约工厂
        const PoemChain = await hre.ethers.getContractFactory("PoemChain");
        console.log("2️⃣ 合约工厂获取成功！");
        
        // 部署合约
        const poemChain = await PoemChain.deploy();
        console.log("3️⃣ 合约已发出交易，等待链上确认...");
        
        // 等待部署完成
        await poemChain.deployed();
        
        // 获取合约地址
        const address = poemChain.address;
        console.log("4️⃣ PoemChain 合约部署地址:", address);
        
    } catch (error) {
        console.error("部署过程中出错:");
        console.error(error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });