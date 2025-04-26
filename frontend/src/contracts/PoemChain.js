// 智能合约 ABI 接口定义
export const POEM_CHAIN_ABI = [
    {
        // 创建诗歌
        inputs: [
            { name: "title", type: "string" },
            { name: "content", type: "string" },
            { name: "isPublic", type: "bool" }
        ],
        name: "createPoem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        // 获取用户的诗歌
        name: "getMyPoems",
        outputs: [
            { name: "titles", type: "string[]" },
            { name: "contents", type: "string[]" },
            { name: "timestamps", type: "uint256[]" },
            { name: "ids", type: "uint256[]" },
            { name: "isPublicList", type: "bool[]" }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        // 搜索诗歌
        inputs: [{ name: "keyword", type: "string" }],
        name: "searchPoems",
        outputs: [
            {
                components: [
                    { name: "id", type: "uint256" },
                    { name: "title", type: "string" },
                    { name: "content", type: "string" },
                    { name: "author", type: "address" },
                    { name: "timestamp", type: "uint256" },
                    { name: "language", type: "string" }
                ],
                name: "results",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "poemId",
                type: "uint256"
            },
            {
                indexed: false,
                name: "author",
                type: "address"
            },
            {
                indexed: false,
                name: "title",
                type: "string"
            },
            {
                indexed: false,
                name: "isPublic",
                type: "bool"
            }
        ],
        name: "PoemCreated",
        type: "event"
    }
];