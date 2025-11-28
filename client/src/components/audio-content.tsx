'use client';

import Link from 'next/link';
import AudioPlayer from '@/components/audio-player';
import { useTheme } from '@/contexts/theme-provider';

import Image from 'next/image';

export default function AudioContent() {
  const { theme } = useTheme();

  return (
    <div className="audio-content">
      <Link
        href="/"
        className='
          underline decoration-dotted
          underline-offset-4 transition-colors
        '
      >
        ← back home
      </Link>
      <h1 className='
        page-title text-center font-medium -tracking-[-0.2em] mb-8
      '>Le Fog Songs</h1>
      <Image
        src={theme === 'dark' ? '/le fog.png' : '/bean.png'}
        alt="le fog"
        width={350}
        height={350}
        priority
        className="mb-8"
      />
      <AudioPlayer />
    </div>
  );
}
