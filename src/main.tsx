import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  // Prevent polyfills from crashing when they try to overwrite window.fetch
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => originalFetch,
      set: () => {
        console.warn('Attempted to overwrite window.fetch ignored to prevent crashes.');
      },
      configurable: true,
    });
  }
} catch (e) {
  console.warn('Failed to protect window.fetch', e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
