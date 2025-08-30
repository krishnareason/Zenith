// src/components/Hero.jsx
const Hero = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-headline">
        The Smarter Way to Journal Your <span className="highlight">Trades</span>
      </h1>
      <p className="hero-subheadline">
        Analyze your trading patterns, discover your edge, and improve your performance with powerful AI-driven insights. Stop guessing, start growing.
      </p>
      <div className="hero-cta-buttons">
        <a href="/register" className="nav-button">Get Started for Free</a>
      </div>
    </section>
  );
};

export default Hero;