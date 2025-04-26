import React from 'react';
import './Universe.css';

function Universe({ language }) {
  return (
    <div className="universe">
      <div className="universe-content">
        <h1 className="universe-title">Poem Chain</h1>
        <p className="universe-slogan">
          {language === 'en' 
            ? 'Every true poet writes what no one else can write'
            : '每个真正的诗人都在书写无人能写的诗'}
        </p>
      </div>
    </div>
  );
}

export default Universe;
