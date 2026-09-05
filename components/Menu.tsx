'use client';

import { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks';

type MenuProps = {
  showMenu: 'active' | 'deactive';
  onNavigate: () => void;
};

const menuItems = [
  { label: 'ОБО МНЕ', href: '#about' },
  { label: 'НАВЫКИ', href: '#skills' },
  { label: 'ПОРТФОЛИО', href: '#projects' },
  { label: 'ОТЗЫВЫ', href: '#reviews' },
  { label: 'КОНТАКТЫ', href: '#contact' },
];

export default function Menu({ showMenu, onNavigate }: MenuProps) {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (showMenu === 'deactive') {
      const timeout = window.setTimeout(() => setMounted(false), 600);
      return () => window.clearTimeout(timeout);
    }
    setMounted(true);
  }, [showMenu]);

  if (!mounted) return null;

  return (
    <div className={`menu-container ${showMenu}`}>
      <div className="overlay" />
      <ul>
        {menuItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} onClick={onNavigate}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <SocialLinks />
    </div>
  );
}
