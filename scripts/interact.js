const hre = require("hardhat");

async function main() {
    const PoemChain = await hre.ethers.getContractFactory("PoemChain");
    const contract = await PoemChain.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const tx = await contract.writePoem("这是我的第一首上链的诗！");
    await tx.wait();
    console.log("✅ 成功写入一首诗！");

    const [author, content, timestamp] = await contract.getPoem(0);
    console.log(`📜 诗作者: ${author}`);
    console.log(`📜 诗内容: ${content}`);
    console.log(`📜 时间戳: ${timestamp}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
