// frontend/src/components/Universe/Universe.new.jsx
import React, { useState, useEffect } from 'react';
import './Universe.css';

const Universe = ({ t, contract, account }) => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPoems = async () => {
      if (contract) {
        try {
          setLoading(true);
          setError(null);
          
          // 使用正确的方法名：getAllPoems
          const allPoems = await contract.getAllPoems();
          console.log("Raw poems data:", allPoems);
          
          if (allPoems && allPoems.length > 0) {
            const formattedPoems = allPoems.map(poem => ({
              id: poem.id.toString(),
              content: poem.content,
              author: poem.author,
              timestamp: poem.timestamp.toString(),
              likes: poem.likes.toString()
            }));
            console.log("Formatted poems:", formattedPoems);
            setPoems(formattedPoems);
          } else {
            setPoems([]);
          }
        } catch (error) {
          console.error("Error loading poems:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPoems();
  }, [contract]);

  if (!contract) {
    return (
      <div className="universe">
        <h1 className="universe-title">{t.universe.title}</h1>
        <p className="loading-text">
          {t.universe.connectWalletPrompt || "Please connect your wallet"}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="universe">
        <h1 className="universe-title">{t.universe.title}</h1>
        <div className="universe-loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="universe">
        <h1 className="universe-title">{t.universe.title}</h1>
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="universe">
      <h1 className="universe-title">{t.universe.title}</h1>
      <div className="poems-container">
        {poems.length > 0 ? (
          poems.map((poem, index) => (
            <div 
              key={poem.id || index} 
              className="floating-line"
              style={{
                '--start-y': `${Math.random() * 80 + 10}vh`,
                '--duration': `${Math.random() * 20 + 20}s`,
                '--delay': `${Math.random() * -20}s`
              }}
            >
              {poem.content}
            </div>
          ))
        ) : (
          <p className="no-poems-text">
            {t.universe.noPoems || "No poems found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Universe;