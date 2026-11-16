import React from 'react';
import './SeasonalTheme.css';

// Christmas background strength is set in SeasonalTheme.css (--seasonal-overlay-opacity: .75, "Balanced").
export default function SeasonalTheme({ enabled, children }) {
  return (
    <div className={`site-theme${enabled ? ' site-theme--christmas' : ''}`}>
      {enabled && <div className="seasonal-background" aria-hidden="true" />}
      {children}
    </div>
  );
}
