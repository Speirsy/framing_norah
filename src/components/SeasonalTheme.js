import React, { useState } from 'react';
import './SeasonalTheme.css';

export default function SeasonalTheme({ enabled, children }) {
  const [overlay, setOverlay] = useState(null);
  return (
    <div className={`site-theme${enabled ? ' site-theme--christmas' : ''}`}
      style={enabled && process.env.NODE_ENV === 'development' && overlay !== null
        ? { '--seasonal-overlay-opacity': overlay } : undefined}>
      {enabled && <div className="seasonal-background" aria-hidden="true" />}
      {children}
      {enabled && process.env.NODE_ENV === 'development' && (
        <fieldset className="seasonal-preview">
          <legend>Local Christmas preview</legend>
          {[['Subtle', 0.85], ['Balanced', 0.75], ['Bold', 0.55]].map(([label, value]) => (
            <label key={label}>
              <input type="radio" name="seasonal-overlay" value={value}
                checked={(overlay ?? 0.75) === value} onChange={() => setOverlay(value)} />
              {label}
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}
