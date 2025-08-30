// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api'; // Import our central API client

const LoginPage = () => {
  // State to hold form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hook for navigation
  const navigate = useNavigate();
  const auth = useAuth(); // Get the auth context

  // --- THIS IS THE UPDATED FUNCTION WITH DEBUG LOGS ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    console.log('--- Starting Login Attempt ---'); // Debug log 1
    try {
        console.log('Sending request to backend with:', { email, password }); // Debug log 2
        const response = await api.post('/auth/login', { email, password });

        console.log('SUCCESS: Received successful response from backend.'); // Debug log 3
        console.log('Response data:', response.data); // Debug log 4

        if (response.data && response.data.token) {
            console.log('Token found! Logging in and navigating...'); // Debug log 5
            auth.login(response.data.token);
            navigate('/dashboard');
        } else {
            console.error('ERROR: Login responded 200 OK, but NO TOKEN in response!'); // Debug log 6
            setError('An unexpected error occurred. No token received.');
        }
    } catch (err) {
        console.error('--- CATCH BLOCK: An error occurred during the API call ---', err); // Debug log 7
        if (err.response) {
            console.error('Error response data:', err.response.data);
            console.error('Error response status:', err.response.status);
        }
        setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h2>Welcome Back</h2>
        <p className="auth-subtext">Please enter your details to sign in.</p>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;