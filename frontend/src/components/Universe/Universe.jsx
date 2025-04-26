import React from 'react';
import './Universe.css';

const Universe = ({ contract, account, currentLang, t }) => {
  return (
    <div className="universe">
      <div className="floating-poems">
        {/* 这里是飘动的诗句 */}
      </div>
      <div className="center-content">
        <h1 className="title">
          <div>Poem</div>
          <div>Chain</div>
        </h1>
        <div className="slogan">
          {currentLang === 'zh' 
            ? "每个真正的诗人都在书写无人能写的诗"
            : "Every true poet writes what no one else can write"
          }
        </div>
      </div>
    </div>
  );
};

export default Universe;
