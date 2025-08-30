// src/pages/DocumentationPage.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DocumentationPage = () => {
  return (
    <div>
      <Navbar />
      <div className="page-container documentation-container">
        <h1>TrackInTrade Documentation</h1>
        <p className="doc-intro">Welcome to TrackInTrade! Here's a guide to help you get the most out of the application.</p>

        <section>
          <h2>1. Getting Started</h2>
          <p>To begin, you need to create an account. Click on the 'Register' button on the homepage and fill in your name, email, and password. Once registered, you can log in to access your personal dashboard.</p>
        </section>

        <section>
          <h2>2. The Dashboard</h2>
          <p>Your dashboard provides a high-level overview of your trading performance. It includes:</p>
          <ul>
            <li><b>KPI Cards:</b> Quick stats like your Total P&L, Win Rate, and Total Trades.</li>
            <li><b>Charts:</b> Visualizations of your performance by month, day of the week, strategy, and your cumulative profit over time.</li>
          </ul>
        </section>

        <section>
          <h2>3. Managing Trades</h2>
          <p>The 'Trades' page is where you manage your individual trade logs. You can see all your trades in a detailed table.</p>
          <ul>
            <li><b>Add a Trade:</b> Click the 'Add New Trade' button to open a form where you can log all details of a new trade, including commissions and fees for accurate P&L calculation.</li>
            <li><b>Edit a Trade:</b> Click the 'Edit' button on any trade row to open the form with its data pre-filled, allowing you to make corrections.</li>
            <li><b>Delete a Trade:</b> Click the 'Delete' button to permanently remove a trade from your journal.</li>
          </ul>
        </section>

        <section>
          <h2>4. Journaling: Notes & Goals</h2>
          <p>Effective journaling goes beyond just numbers.</p>
          <ul>
            <li><b>Notes:</b> The 'Notes' page is your personal trading diary. Create notes to reflect on market conditions, your mindset, or lessons learned.</li>
            <li><b>Goals:</b> The 'Goals' page allows you to set specific, measurable targets for your trading, such as monthly profit or win rate, to keep you focused and disciplined.</li>
          </ul>
        </section>

        <section>
          <h2>5. AI Insights</h2>
          <p>The 'AI Insights' page leverages the power of generative AI to analyze your trading data. Click the 'Generate Insights' button, and the AI will provide 2-3 personalized, actionable insights based on your recent performance, helping you identify patterns you might have missed.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentationPage;