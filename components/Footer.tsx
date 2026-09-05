import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="site-section">
      <div className="wrapper">
        <p>© {new Date().getFullYear()} Матвей — Python / Telegram / Backend</p>
        <SocialLinks />
      </div>
    </footer>
  );
}
