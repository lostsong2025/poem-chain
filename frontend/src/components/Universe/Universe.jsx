import React from 'react';
import './Universe.css';

const Universe = ({ contract, account }) => {
  return (
    <div className="universe">
      <div className="center-content">
        <h1 className="title">
          <div>Poem</div>
          <div>Chain</div>
        </h1>
      </div>
      <div className="floating-poems">
        {/* 这里可以添加飘动的诗句 */}
      </div>
    </div>
  );
};

export default Universe;
