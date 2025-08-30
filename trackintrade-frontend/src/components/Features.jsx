// src/components/Features.jsx
const featuresList = [
  {
    icon: '📈',
    title: 'Advanced Analytics',
    description: 'Go beyond P&L with detailed charts and metrics on your performance, strategies, and habits.'
  },
  {
    icon: '🤖',
    title: 'AI-Powered Insights',
    description: 'Unlock personalized feedback. Our AI analyzes your trade notes and data to find your blind spots.'
  },
  {
    icon: '🎯', // <-- NEW ICON
    title: 'Goal Setting', // <-- NEW TITLE
    description: 'Set, track, and achieve your trading goals. Stay motivated and disciplined with visual progress trackers.' // <-- NEW DESCRIPTION
  },
  {
    icon: '🧮', // <-- NEW ICON
    title: 'Cost Analysis', // <-- NEW TITLE
    description: 'Factor in commissions and fees to understand your true net profitability and the real cost of your trading.' // <-- NEW DESCRIPTION
  },
  {
    icon: '📒',
    title: 'Effortless Journaling',
    description: 'Quickly log trades with a clean, intuitive interface designed to get you back to the charts fast.'
  },
  {
    icon: '📊',
    title: 'Visual Charting',
    description: 'Visualize your performance with beautiful, interactive charts for P&L, win rates, and more.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your trading data is your business. We ensure it stays that way with end-to-end security.'
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Access your journal and analyze trades from your desktop, tablet, or phone, anytime.'
  }
];

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="features-section">
      <h2 className="features-title">Everything You Need to Succeed</h2>
      <div className="features-grid">
        {featuresList.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;