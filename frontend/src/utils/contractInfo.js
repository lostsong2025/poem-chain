// frontend/src/utils/contractInfo.js
export const CONTRACT_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_content",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_isPublic",
        "type": "bool"
      }
    ],
    "name": "createPoem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "poemId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isPublic",
        "type": "bool"
      }
    ],
    "name": "PoemCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getPublicPoems",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "authors",
        "type": "address[]"
      },
      {
        "internalType": "string[]",
        "name": "titles",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "contents",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "timestamps",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyPoems",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "titles",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "contents",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "timestamps",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "bool[]",
        "name": "isPublicList",
        "type": "bool[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_poemId",
        "type": "uint256"
      }
    ],
    "name": "togglePoemVisibility",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];