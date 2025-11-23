'use client';
import { useTheme } from '@/app/contexts/theme-provider';
import Icon from '@/components/icon';

export default function ThemeSwitch() {
  const { theme, setTheme: handleSetTheme } = useTheme();

  return (
    <button
      onClick={() => {
        handleSetTheme(theme === 'light' ? 'dark' : 'light');
      }}
      className="theme-switch btn"
      aria-label={`
        Switch to ${theme === 'light' ? 'dark' : 'light'} theme
      `}
    >
      {theme === 'light'
        ? <Icon name="LightningSlashIcon" />
        : <Icon name="LightningIcon" />}
    </button>
  );
}
