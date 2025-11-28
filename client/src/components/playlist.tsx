'use client';
import { JSX } from 'react';
import { useAudio } from '@/contexts/audio-provider';
import Icon from './icon';

export default function Playlist(): JSX.Element {

  const { showPlaylist, playlist, setShowPlaylist } = useAudio();

  const closePlaylist = () => {
    if (typeof setShowPlaylist === 'function') {
      (setShowPlaylist as (v: boolean) => void)(false);
    }
  };

  return (
    <>
      {
        showPlaylist
          ? (
            <div
              className="playlist-overlay"
              onClick={closePlaylist}
              role="button"
              tabIndex={0}
              aria-label="Close playlist overlay"
            >
              <div
                className="playlist-container"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="playlist-header">
                  <h2 className="playlist-title">Playlist</h2>
                  <span
                    className="close-icon"
                    onClick={closePlaylist}
                    role="button"
                    tabIndex={0}
                    aria-label="Close playlist"
                  >
                    <Icon name="XIcon" size={20} />
                  </span>
                </div>
                <div className="playlist-content">
                  {playlist.length === 0 ? (
                    <p className="empty-playlist-message">Playlist empty.</p>
                  ) : (
                    <ul className="playlist-items">
                      {playlist.map((track, index) => (
                        <li key={index} className="playlist-item">
                          <span className="track-title">{track.title}</span>
                          <span className="track-artist">{track.artist}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <Icon name="playlist" size={24} />
            </>
          )
      }
      <div>Playlist Component</div>
    </>
  );
}
