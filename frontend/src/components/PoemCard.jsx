import React from 'react';
import './PoemCard.css';

const PoemCard = ({ poem, isOwner, onToggleVisibility, contract, userAddress }) => {
    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const shortenAddress = (address) => {
        return address.substring(0, 6) + '...' + address.substring(38);
    };

    return (
        <div className={`poem-card ${!poem.isPublic ? 'private' : ''}`}>
            <div className="poem-header">
                <h3 className="poem-title">{poem.title}</h3>
                <div className="poem-meta">
                    <span className="poem-author">
                        {shortenAddress(poem.author)}
                    </span>
                    <span className="poem-date">
                        {formatDate(poem.timestamp)}
                    </span>
                    {isOwner && (
                        <button 
                            className="visibility-toggle"
                            onClick={() => onToggleVisibility(poem.id)}
                        >
                            {poem.isPublic ? '设为私密' : '公开分享'}
                        </button>
                    )}
                </div>
            </div>
            <div className="poem-content">
                {poem.content.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
};

export default PoemCard;