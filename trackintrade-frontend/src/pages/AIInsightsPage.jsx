// src/pages/AIInsightsPage.jsx
import { useState } from 'react';
import api from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AIInsightsPage = () => {
    const [insights, setInsights] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateInsights = async () => {
        setLoading(true);
        setError('');
        setInsights('');
        try {
            const response = await api.get('/ai/insights');
            setInsights(response.data.insights);
        } catch (err) {
            setError('Failed to generate insights. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="page-container">
                <div className="page-header">
                    <h1>AI Insights</h1>
                </div>
                <div className="ai-insights-content">
                    <p>Click the button below to generate personalized insights based on your recent trading activity. Our AI will analyze your data to find patterns and potential areas for improvement.</p>
                    <button onClick={handleGenerateInsights} disabled={loading} className="btn-primary">
                        {loading ? 'Generating...' : 'Generate Insights'}
                    </button>

                    {error && <p className="error-message" style={{marginTop: '1rem'}}>{error}</p>}

                    {insights && (
                        <div className="insights-result">
                            <h3>Your Personalized Analysis:</h3>
                            <pre>{insights}</pre>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AIInsightsPage;