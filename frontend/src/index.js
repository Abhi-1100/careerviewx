import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Hide the HTML splash screen after React mounts
function hideSplash() {
  const splash = document.getElementById('cvx-splash');
  if (!splash) return;
  // Small delay so the app has time to paint its first frame
  setTimeout(() => {
    splash.classList.add('splash-hidden');
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
    // Safety fallback if transitionend never fires
    setTimeout(() => { if (splash.parentNode) splash.remove(); }, 800);
  }, 400);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// Remove splash once React has rendered
hideSplash();

