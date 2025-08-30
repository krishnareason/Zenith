// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 
import AIInsightsPage from './pages/AIInsightsPage';
import GoalsPage from './pages/GoalsPage';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DocumentationPage from './pages/DocumentationPage';
import DashboardPage from './pages/DashboardPage';
import TradesPage from './pages/TradesPage';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/trades" element={<ProtectedRoute><TradesPage /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><AIInsightsPage /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;