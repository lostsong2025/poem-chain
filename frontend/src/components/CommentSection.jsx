// src/components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import './CommentSection.css';

const CommentSection = ({ poemId, contract, userAddress }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loadComments = async () => {
        if (!contract || !poemId) return;

        try {
            setIsLoading(true);
            const result = await contract.getComments(poemId);
            const [authors, contents, timestamps] = result;

            const commentsList = authors.map((author, index) => ({
                author,
                content: contents[index],
                timestamp: Number(timestamps[index])
            }));

            setComments(commentsList.sort((a, b) => b.timestamp - a.timestamp));
        } catch (error) {
            console.error("加载评论失败:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!contract || !userAddress || !newComment.trim()) return;

        try {
            setIsLoading(true);
            const tx = await contract.addComment(poemId, newComment.trim());
            await tx.wait();
            setNewComment('');
            await loadComments();
        } catch (error) {
            console.error("提交评论失败:", error);
            alert("评论失败: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [contract, poemId]);

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString('zh-CN');
    };

    const shortenAddress = (address) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    return (
        <div className="comment-section">
            {userAddress && (
                <form onSubmit={handleSubmitComment} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="写下你的评论..."
                        maxLength={500}
                    />
                    <button type="submit" disabled={isLoading || !newComment.trim()}>
                        {isLoading ? '提交中...' : '发表评论'}
                    </button>
                </form>
            )}

            <div className="comments-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <div className="comment-header">
                            <span className="comment-author">{shortenAddress(comment.author)}</span>
                            <span className="comment-date">{formatDate(comment.timestamp)}</span>
                        </div>
                        <div className="comment-content">{comment.content}</div>
                    </div>
                ))}
                {comments.length === 0 && !isLoading && (
                    <div className="no-comments">暂无评论</div>
                )}
                {isLoading && <div className="loading">加载中...</div>}
            </div>
        </div>
    );
};

export default CommentSection;