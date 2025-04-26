// frontend/src/components/CreatePoem/CreatePoem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePoem.css';

function CreatePoem({ contract, userAddress }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!contract || !userAddress) {
      alert('请先连接钱包');
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空');
      return;
    }

    try {
      setIsSubmitting(true);
      const tx = await contract.createPoem(title, content, isPublic);
      console.log('创建诗歌交易已发送:', tx.hash);
      
      await tx.wait();
      console.log('诗歌创建成功');
      
      // 重置表单
      setTitle('');
      setContent('');
      setIsPublic(true);
      
      // 导航到首页
      navigate('/');
    } catch (error) {
      console.error('创建诗歌失败:', error);
      alert('创建诗歌失败: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userAddress) {
    return (
      <div className="create-poem-connect">
        <h2>创建新诗歌</h2>
        <p>请先连接钱包以创建诗歌</p>
      </div>
    );
  }

  return (
    <div className="create-poem">
      <div className="create-poem-container">
        <h2>创建新诗歌</h2>
        <form onSubmit={handleSubmit} className="create-poem-form">
          <div className="form-group">
            <label htmlFor="title">标题</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入诗歌标题"
              disabled={isSubmitting}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">内容</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入诗歌内容"
              rows="8"
              disabled={isSubmitting}
              maxLength={1000}
            />
            <div className="content-length">
              {content.length}/1000
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                disabled={isSubmitting}
              />
              公开发布
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? '创建中...' : '创建诗歌'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePoem;