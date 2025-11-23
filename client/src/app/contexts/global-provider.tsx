import { ThemeProvider } from '@/app/contexts/theme-provider';
import { AudioProvider } from '@/app/contexts/audio-provider';
import { IconProvider } from '@/app/contexts/icon-provider';

export const GlobalProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <ThemeProvider>
      <AudioProvider>
        <IconProvider>
          {children}
        </IconProvider>
      </AudioProvider>
    </ThemeProvider>
  );
};
