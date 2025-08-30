// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // <-- NEW
import './index.css';
import './assets/krishna.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- NEW */}
      <App />
    </AuthProvider> {/* <-- NEW */}
  </React.StrictMode>,
)