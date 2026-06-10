import { FaGithub, FaTelegramPlane } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <div className="social">
      <a href="https://github.com/Mateush2131" target="_blank" rel="noreferrer" aria-label="GitHub">
        <FaGithub />
      </a>
      <a href="https://t.me/Alakir_22" target="_blank" rel="noreferrer" aria-label="Telegram">
        <FaTelegramPlane />
      </a>
    </div>
  );
}
