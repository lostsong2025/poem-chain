// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PoemChain {
    struct Poem {
        uint256 id;
        address author;
        string title;
        string content;
        uint256 timestamp;
        bool isPublic;  // 新增：控制诗歌是否公开
    }

    mapping(uint256 => Poem) private poems;
    uint256 private poemCount;
    
    // 记录每个作者的诗歌ID列表
    mapping(address => uint256[]) private authorToPoems;

    event PoemCreated(uint256 indexed poemId, address author, string title, bool isPublic);

    function createPoem(string memory _title, string memory _content, bool _isPublic) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");

        poemCount++;
        poems[poemCount] = Poem(
            poemCount,
            msg.sender,
            _title,
            _content,
            block.timestamp,
            _isPublic
        );

        authorToPoems[msg.sender].push(poemCount);
        emit PoemCreated(poemCount, msg.sender, _title, _isPublic);
    }

    // 获取公开的诗歌列表
    function getPublicPoems() public view returns (
        address[] memory authors,
        string[] memory titles,
        string[] memory contents,
        uint256[] memory timestamps,
        uint256[] memory ids
    ) {
        uint256 publicCount = 0;
        for (uint256 i = 1; i <= poemCount; i++) {
            if (poems[i].isPublic) {
                publicCount++;
            }
        }

        authors = new address[](publicCount);
        titles = new string[](publicCount);
        contents = new string[](publicCount);
        timestamps = new uint256[](publicCount);
        ids = new uint256[](publicCount);

        uint256 index = 0;
        for (uint256 i = 1; i <= poemCount; i++) {
            if (poems[i].isPublic) {
                Poem storage poem = poems[i];
                authors[index] = poem.author;
                titles[index] = poem.title;
                contents[index] = poem.content;
                timestamps[index] = poem.timestamp;
                ids[index] = poem.id;
                index++;
            }
        }
    }

    // 获取用户自己的所有诗歌（包括私密的）
    function getMyPoems() public view returns (
        string[] memory titles,
        string[] memory contents,
        uint256[] memory timestamps,
        uint256[] memory ids,
        bool[] memory isPublicList
    ) {
        uint256[] memory myPoemIds = authorToPoems[msg.sender];
        uint256 myPoemCount = myPoemIds.length;

        titles = new string[](myPoemCount);
        contents = new string[](myPoemCount);
        timestamps = new uint256[](myPoemCount);
        ids = new uint256[](myPoemCount);
        isPublicList = new bool[](myPoemCount);

        for (uint256 i = 0; i < myPoemCount; i++) {
            Poem storage poem = poems[myPoemIds[i]];
            titles[i] = poem.title;
            contents[i] = poem.content;
            timestamps[i] = poem.timestamp;
            ids[i] = poem.id;
            isPublicList[i] = poem.isPublic;
        }
    }

    // 切换诗歌的公开状态
    function togglePoemVisibility(uint256 _poemId) public {
        require(_poemId > 0 && _poemId <= poemCount, "Invalid poem ID");
        require(poems[_poemId].author == msg.sender, "Not the author");
        
        poems[_poemId].isPublic = !poems[_poemId].isPublic;
    }
}