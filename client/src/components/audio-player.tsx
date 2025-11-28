
'use client';
import { JSX, useCallback, useMemo } from 'react';
import { useAudio } from '@/contexts/audio-provider';
import PlaylistDrawer from '@/components/playlist-drawer';
import Icon from '@/components/icon';
import Volume from './volume';

import { useState } from 'react';
import { useRef } from 'react';

export default function AudioPlayer(): JSX.Element {
  const {
    playback, play, pause, nextSong, previousSong,
    elapsed, duration, loading, error, trackTitle, safePct, formatTime,
    showPlaylist, setShowPlaylist, setShowPlayer, currentTrack,
  } = useAudio();

  // Player size toggle state
  const [large, setLarge] = useState(false);
  // Accessibility: focus management for main player
  const playerRef = useRef<HTMLDivElement>(null);

  const progressStyle = useMemo(() => {
    const pct = String(Math.max(0, Math.min(100, safePct)));
    return {
      width: pct + '%'
    };
  }, [safePct]);

  const handleTogglePlaylist = useCallback(() => {
    setShowPlaylist(!showPlaylist);
  }, [setShowPlaylist, showPlaylist]);
  const handleHidePlayer = useCallback(() => {
    setShowPlayer(false);
  }, [setShowPlayer]);
  const handlePrev = useCallback(() => {
    if (!loading) {
      previousSong();
    }
  }, [loading, previousSong]);
  const handleNext = useCallback(() => {
    if (!loading) {
      nextSong();
    }
  }, [loading, nextSong]);
  const handlePlayPause = useCallback(() => {
    if (loading || !!error) {
      return;
    }
    if (playback) {
      pause();
    } else {
      play();
    }
  }, [loading, error, playback, pause, play]);

  return (
    <div
      ref={playerRef}
      className={[
        'audio-player fixed left-1/2',
        large ? 'bottom-24' : 'bottom-8',
        'translate-x-[-50%] z-40 flex flex-col items-center justify-center p-4',
        'rounded-2xl shadow-2xl backdrop-blur-lg bg-neutral-900/80',
        'transition-all duration-300'
      ].join(' ')}
      style={{
        minWidth: large ? 400 : 320,
        maxWidth: large ? 600 : 400,
        background: 'rgba(24,24,24,0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}
      role="region"
      aria-label="Audio player controls"
      tabIndex={-1}
    >
      <span
        className='
          size-toggle absolute right-4
          top-4 cursor-pointer
          text-gray-400 hover:text-white
        '
        onClick={() => { setLarge((v) => !v); }}
        role="button"
        tabIndex={0}
        aria-label={large ? 'Shrink player' : 'Enlarge player'}
      >
        {
          large
            ? (
              <Icon name='MinusIcon' size={20} />
            ) : (
              <Icon name='ArrowsOutSimpleIcon' size={20} />
            )}
      </span>
      <span
        className="close-icon"
        onClick={handleHidePlayer}
        role="button"
        tabIndex={0}
        aria-label="Close audio player"
      >
        <Icon name="XIcon" size={20} />
      </span>
      <span
        className='
          playlist-icon absolute
          left-4 top-4 cursor-pointer
        text-gray-400 hover:text-white
        '
        onClick={handleTogglePlaylist}
        role="button"
        tabIndex={0}
        aria-label={showPlaylist ? 'Hide playlist' : 'Show playlist'}
      >
        <Icon name="PlaylistIcon" size={20} />
      </span>
      <div className="w-full flex justify-center items-center mt-2 mb-2">
        <Volume />
      </div>
      {playback && currentTrack && (
        <div className='
          w-full text-center text-base
          font-semibold text-white
          truncate mt-2 mb-1
        '>
          {currentTrack.artist && (
            <span className="text-gray-300">{currentTrack.artist} - </span>
          )}
          <span>{trackTitle}</span>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 mt-2 mb-2">
        <button
          type="button"
          className="w-10 h-10 px-0 py-0"
          onClick={handlePrev}
          disabled={loading}
          title="Previous"
          aria-label="Previous"
        >
          <Icon name="SkipBackIcon" size={20} />
        </button>
        <button
          type="button"
          className="w-10 h-10 px-0 py-0"
          onClick={handlePlayPause}
          disabled={loading || !!error}
          title={playback ? 'Pause' : 'Play'}
          aria-label={playback ? 'Pause' : 'Play'}
        >
          {playback ? (
            <Icon name="PauseIcon" size={20} />
          ) : (
            <Icon name="PlayIcon" size={20} />
          )}
        </button>
        <button
          type="button"
          className="w-10 h-10 px-0 py-0"
          onClick={handleNext}
          disabled={loading}
          title="Next"
          aria-label="Next"
        >
          <Icon name="SkipForwardIcon" size={20} />
        </button>
      </div>

      <div className="w-full flex items-center justify-between mt-2 mb-2">
        <span className="nums text-xs text-gray-300 min-w-12 text-right">
          {formatTime(elapsed)}
        </span>
        <div
          className="grow h-1 rounded bg-neutral-700/60 overflow-hidden mx-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(safePct)}
          aria-label="Playback progress"
        >
          <div
            className="h-1 bg-white transition-[width] duration-300 ease-linear"
            style={progressStyle}
          />
        </div>
        <span className="nums text-xs text-gray-400 min-w-12 text-left">
          {formatTime(duration)}
        </span>
      </div>
      {error && (
        <div className='
          w-full text-center text-sm
          text-red-400 mt-2
          mb-1 animate-pulse
        '>
          {error}
        </div>
      )}
      <PlaylistDrawer
        open={showPlaylist}
        onClose={handleTogglePlaylist}
        large={large}
      />
    </div>
  );
}
