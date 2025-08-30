// src/components/Footer.jsx

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} TrackInTrade. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="#features" className="footer-link">Features</a>
          {/* You can add a link to your source code or documentation here if you like */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;