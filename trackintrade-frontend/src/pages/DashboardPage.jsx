// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [pnlByMonth, setPnlByMonth] = useState([]);
  const [pnlByDay, setPnlByDay] = useState([]);
  const [pnlOverTime, setPnlOverTime] = useState([]);
  const [pnlByStrategy, setPnlByStrategy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Use Promise.all to fetch all data concurrently for faster loading
        const [
          summaryRes,
          pnlByMonthRes,
          pnlByDayRes,
          pnlOverTimeRes,
          pnlByStrategyRes
        ] = await Promise.all([
          api.get('/dashboard/summary'),
          api.get('/dashboard/pnl-by-month'),
          api.get('/dashboard/pnl-by-day'),
          api.get('/dashboard/pnl-over-time'),
          api.get('/dashboard/profit-by-strategy')
        ]);

        setSummary(summaryRes.data);
        setPnlByMonth(pnlByMonthRes.data);
        setPnlByDay(pnlByDayRes.data);
        // Format the date for better readability on the chart's X-axis
        setPnlOverTime(pnlOverTimeRes.data.map(d => ({ ...d, date: new Date(d.date).toLocaleDateString() })));
        setPnlByStrategy(pnlByStrategyRes.data);

      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // The empty array [] means this effect runs only once when the component mounts

  if (loading) {
    return <div className="loading-container"><h1>Loading Dashboard...</h1></div>;
  }

  if (error) {
    return <div className="loading-container"><h1>{error}</h1></div>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        {/* KPI Cards Section */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <h2>Total P&L</h2>
            <p className={summary.total_pnl >= 0 ? 'positive' : 'negative'}>
              ${summary.total_pnl.toFixed(2)}
            </p>
          </div>
          <div className="kpi-card">
            <h2>Win Rate</h2>
            <p>{summary.win_rate.toFixed(2)}%</p>
          </div>
          <div className="kpi-card">
            <h2>Total Trades</h2>
            <p>{summary.total_trades}</p>
          </div>
          <div className="kpi-card">
            <h2>Profitable Trades</h2>
            <p>{summary.profitable_trades}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Monthly P&L</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pnlByMonth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Bar dataKey="pnl" fill="var(--primary-blue)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2>Performance by Day of the Week</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pnlByDay} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="day" type="category" stroke="#9CA3AF" width={80}/>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Bar dataKey="pnl" fill="var(--primary-blue)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2>P&L Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pnlOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Line type="monotone" dataKey="cumulativePnl" name="Cumulative P&L" stroke="var(--primary-blue)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2>Profit by Strategy</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pnlByStrategy} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="strategy" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Bar dataKey="totalPnl" name="Total P&L" fill="var(--primary-blue)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;