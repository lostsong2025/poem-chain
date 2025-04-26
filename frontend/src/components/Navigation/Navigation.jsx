import React from 'react';
import './Navigation.css';

function Navigation({ account, connectWallet }) {
  return (
    <nav className="navigation">
      <div className="nav-buttons">
        <button className="nav-button active">Home</button>
        <button className="nav-button">My Poems</button>
        <button className="nav-button">Create Poem</button>
        {account ? (
          <span className="wallet-display">{account}</span>
        ) : (
          <button className="nav-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
