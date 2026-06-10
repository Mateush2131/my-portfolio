'use client';

import Image from 'next/image';
import { useState } from 'react';
import Menu from './Menu';

type MenuState = false | 'active' | 'deactive';

export default function Navbar() {
  const [menuState, setMenuState] = useState<MenuState>(false);

  const toggleMenu = () => {
    setMenuState((state) => {
      if (!state) return 'active';
      if (state === 'deactive') return 'active';
      return 'deactive';
    });
  };

  const closeMenu = () => {
    if (menuState === 'active') setMenuState('deactive');
  };

  return (
    <>
      <nav id="navbar">
        <div className="nav-wrapper">
          <a href="#welcome-section" className="brand">
            <Image
              src="/logo.png"
              alt="AlaCode"
              width={40}
              height={40}
              className="brand-logo"
              priority
            />
            <span className="brand-text">AlaCode</span>
          </a>
          <button
            type="button"
            className={`menu-button ${menuState === 'active' ? 'active' : ''}`}
            aria-label="Открыть меню"
            onClick={toggleMenu}
          >
            <span />
          </button>
        </div>
      </nav>
      {menuState ? <Menu showMenu={menuState} onNavigate={closeMenu} /> : null}
    </>
  );
}
