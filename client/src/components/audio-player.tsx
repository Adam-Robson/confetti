
'use client';
import { useCallback, useMemo } from 'react';
import { useAudio } from '@/app/contexts/audio-provider';
import Icon from '@/components/icon';
import type { SongType } from '@/lib/types/songs';

export default function AudioPlayer() {
  const {
    playback, play, pause, nextSong, previousSong,
    elapsed, duration, loading, error, trackTitle, safePct, formatTime,
    showPlaylist, setShowPlaylist, playlist, queueAndPlay, setShowPlayer,
    currentTrack, volume, updateVolume, muted, toggleMute,
  } = useAudio();

  const progressStyle = useMemo(() => {
    const pct = String(Math.max(0, Math.min(100, safePct)));
    return {
      width: pct + '%'
    };
  }, [safePct]);

  const handleTogglePlaylist = useCallback(() => {
    setShowPlaylist(!showPlaylist);
  }, [setShowPlaylist, showPlaylist]);
  const handleClosePlaylist = useCallback(() => {
    setShowPlaylist(false);
  }, [setShowPlaylist]);
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
  const handleSelectTrack = useCallback((track: SongType) => {
    queueAndPlay(track, playlist);
    setShowPlaylist(false);
  }, [queueAndPlay, playlist, setShowPlaylist]);

  return (
    <>
      <div className="audio-unit">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleTogglePlaylist}
              title={showPlaylist ? 'Hide playlist' : 'Show playlist'}
              aria-label={showPlaylist ? 'Hide playlist' : 'Show playlist'}
            >
              <Icon name="PlaylistIcon" size={20} />
            </button>
            <div
              className="flex-1 text-center truncate text-sm select-none px-2"
              aria-live="polite"
              title={
                loading
                  ? 'Loading…'
                  : error
                    ? 'Playback error'
                    : trackTitle || 'No song loaded'
              }
            >
              {trackTitle ||
                (loading ? 'Loading…' : error ? 'Playback error' : '—')}
            </div>
            <button
              type="button"
              onClick={handleHidePlayer}
              title="Hide player"
              aria-label="Hide player"
            >
              <Icon name="XIcon" size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d='
                      M9.383 3.076A1 1 0 0110 4v12a1 1
                      0 01-1.617.816L4.5 13H2a1 1 0
                      01-1-1V8a1 1 0 011-1h2.5l3.883-3.816z'
                      clipRule="evenodd"
                    />
                    <path
                      d='
                      M12.293 7.293a1 1 0 011.414
                      0L15 8.586l1.293-1.293a1 1 0
                      111.414 1.414L16.414 10l1.293
                      1.293a1 1 0 01-1.414 1.414L15
                      11.414l-1.293 1.293a1 1 0
                      01-1.414-1.414L13.586 10l-1.293-1.293a1
                      1 0 010-1.414z'
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d='
                      M9.383 3.076A1 1 0
                      0110 4v12a1 1 0 01-1.617.816L4.5
                      13H2a1 1 0 01-1-1V8a1 1 0
                      011-1h2.5l3.883-3.816z
                       '
                      clipRule="evenodd"
                    />
                    <path
                      d='
                      M12 8a3 3 0 013 3v2a3 3
                      0 11-6 0V9a3 3 0 013-3z
                      '
                    />
                  </svg>
                )}
              </button>
              <div className="flex items-center space-x-2 min-w-20">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    updateVolume(parseFloat(e.target.value));
                  }}
                  className='
                  w-12 h-1 bg-gray-600
                  rounded-lg appearance-none
                  cursor-pointer'
                  style={{
                    background:
                      'linear-gradient(to right, white 0%, white ' +
                      String((muted ? 0 : volume) * 100) + '%, ' +
                      'rgb(75, 85, 99) ' + String(
                        (muted ? 0 : volume) * 100
                      ) + '%, ' +
                      'rgb(75, 85, 99) 100%)'
                  }}
                />
              </div>
            </div>
            {currentTrack && (
              <div
                className="flex-1 text-center text-xs text-gray-400 truncate"
              >
                {currentTrack.artist && (
                  <span>{currentTrack.artist} - </span>
                )}
                {currentTrack.title}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-2">
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
          <div className="flex items-center gap-2 text-xs">
            <span className="nums">{formatTime(elapsed)}</span>
            <div
              className="grow h-1 rounded bg-neutral-700/60 overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(safePct)}
              aria-label="Playback progress"
            >
              <div
                className='
                h-1 bg-white transition-[width] duration-300 ease-linear
                '
                style={progressStyle}
              />
            </div>
            <span className="nums text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      {showPlaylist && playlist.length > 0 && (
        <div className='
        absolute bottom-full left-0
        right-0 bg-gray-800 border border-gray-700
        rounded-t-lg max-h-64 overflow-y-auto
        '>
          <div className='
          flex items-center justify-between
          p-3 border-b border-gray-700
          '>
            <h3 className="text-sm font-medium">Playlist</h3>
            <button
              onClick={handleClosePlaylist}
              className='p-1 hover:bg-gray-700 rounded'
              title="Close playlist">
              <Icon name="XIcon" size={16} />
            </button>
          </div>
          <div className="p-2">
            {playlist.map((track, index) => (
              <button
                key={`${track.id || String(index)}-${track.title}`}
                onClick={() => {
                  handleSelectTrack(track);
                }}
                className={`
                  w-full text-left p-2 
                  rounded text-sm hover:bg-gray-700 
                  transition-colors 
                  ${currentTrack?.id === track.id ? 'bg-gray-600' : ''}
                  `}
              >
                <div className="truncate font-medium">{track.title}</div>
                {track.artist && (
                  <div
                    className="truncate text-gray-400 text-xs">
                    {track.artist}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
