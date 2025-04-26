import { useState } from 'react';
import './PoemForm.css';

const PoemForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form className="poem-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="诗歌标题..."
        className="poem-title-input"
        disabled={loading}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的诗..."
        className="poem-content-input"
        disabled={loading}
      />
      <button 
        type="submit" 
        className="submit-button"
        disabled={loading || !title.trim() || !content.trim()}
      >
        {loading ? '发布中...' : '发布诗歌'}
      </button>
    </form>
  );
};

export default PoemForm;