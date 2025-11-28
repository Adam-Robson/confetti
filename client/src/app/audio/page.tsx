
import { ReactNode } from 'react';
import { GlobalProvider } from '@/contexts/global-provider';
import AudioContent from '@/components/audio-content';
import '@/styles/audio.css';

export default function AudioPage({
  children
}: {
  children: ReactNode
}) {
  return (
    <GlobalProvider>
      {children}
      <div className="audio-player-container">
        <AudioContent />
      </div>
    </GlobalProvider>
  );
}
