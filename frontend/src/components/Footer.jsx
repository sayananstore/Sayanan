import "./styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-divider" />

      <div className="footer-copy">
        © {new Date().getFullYear()} Sayanan Lifestyle
      </div>

      <div className="footer-tagline">
        Crafted by hand. Designed for life.
      </div>
    </div>
  );
};

export default Footer;
