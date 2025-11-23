export interface SongType {
  id: string;
  title: string;
  album: string;
  artist: string;
  src: string;
  duration: number;
  cover: string;
}

export interface AlbumType {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  year?: number;
  genre?: string;
  songs: SongType[];
  duration?: number; // total album duration in seconds
  description?: string;
}

export interface AudioProviderType {
  // playlist mgmt
  playlist: SongType[];
  setPlaylist: (playlist: SongType[]) => void;
  showPlaylist: boolean;
  setShowPlaylist: (show: boolean) => void;
  showPlayer: boolean;
  setShowPlayer: (show: boolean) => void;
  // playback
  playback: boolean;
  setPlayback: (playing: boolean) => void;
  volume: number;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  toggleMute: () => void;
  // track nav
  nextSong: () => void;
  previousSong: () => void;
  elapsed: number;
  setElapsed: (elapsed: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  // player controls
  updateVolume: (volume: number) => void;
  currentTrack: SongType | null;
  setTrack: (track: SongType) => void;
  queueAndPlay: (track: SongType, playlist?: SongType[]) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;

  // helpers
  trackTitle: string;
  safePct: number;
  formatTime: (time?: number | null) => string;
}
