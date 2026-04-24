import React from 'react';

const Offline = ({ onRetry }) => {
  return (
    <div className="offline-screen animate-fade-in">
      <div className="offline-container">
        <div className="offline-illustration">
          {/* I will use the generated image path here once I have it in the final response */}
          <div className="offline-icon-wrap">
            <div className="offline-icon">📡</div>
            <div className="offline-cross">✕</div>
          </div>
        </div>
        <h1 className="offline-title">No connection</h1>
        <p className="offline-subtitle">
          Please check your internet connectivity and try again.
        </p>
        <button className="offline-retry-btn" onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default Offline;
