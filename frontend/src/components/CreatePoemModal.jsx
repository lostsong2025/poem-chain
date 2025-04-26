import React, { useState } from 'react';
import './CreatePoemModal.css';

const CreatePoemModal = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content, isPublic });
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal">
                <h2>创作新诗</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="诗歌标题"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="诗歌内容"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <label className="visibility-toggle">
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        公开发布
                    </label>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>取消</button>
                        <button type="submit">发布诗歌</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreatePoemModal;