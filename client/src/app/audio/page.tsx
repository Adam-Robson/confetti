
import '../../lib/styles/audio.css';
import { GlobalProvider } from '../contexts/global-provider';
import { ReactNode } from 'react';
import AudioContent from '@/components/audio-content';
import '../../lib/styles/audio.css';

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
