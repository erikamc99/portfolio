import { useEffect, useState } from 'react';
import './ThemeButton.css';
import { Icon } from '@iconify-icon/react';

export const ThemeButton = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    setDark(newDark);
  };

  return (
    <button
      className={`theme-toggle ${dark ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Icon icon="si:light-mode-fill" class="icon light-icon" />
      <Icon icon="material-symbols-light:dark-mode-rounded" class="icon dark-icon" />
      <div className="slider" />
    </button>
  );
}