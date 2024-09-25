// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Get the root element from your HTML
const container = document.getElementById('root');

// Create a root and render your app
const root = createRoot(container);
root.render(<App />);

// Register the service worker
registerServiceWorker();
