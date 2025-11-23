import type { SongType, AlbumType } from '@/lib/types/songs';

// API base URL - proxy in dev, direct in prod
const getApiUrl = (endpoint: string) => {
  if (process.env.NODE_ENV === 'development') {
    // dev uses the Next.js proxy rewrite to backend
    return endpoint;
  }
  // production uses NEXT_PUBLIC_API_URI (set in Vercel)
  const apiUrl = process.env.NEXT_PUBLIC_API_URI
    ?? 'https://thethe.fly.dev';
  return `${apiUrl}${endpoint}`;
};

// fetch playlist from database API
async function fetchPlaylist(): Promise<SongType[]> {
  try {
    const response = await fetch(getApiUrl('/api/songs'));
    if (!response.ok) {
      throw new Error(`Failed to fetch songs: ${String(response.status)}`);
    }

    const data = await response.json();
    // Handle different response formats gracefully
    const songs = data.success ? (data.data || data.songs || []) : (data.songs || data || []);

    return songs.map((song: Record<string, SongType>) => ({
      id: String(song.id),
      title: String(song.title || 'Untitled'),
      artist: String(song.artist || 'Unknown Artist'),
      album: String(song.album || 'Unknown Album'),
      // prefer camelCase fields returned by the server
      src: String(song.fileUrl || song.file_url || song.src || ''),
      cover: String(song.coverArtUrl || song.cover_art_url || song.cover || '/images/default-album.jpg'),
      duration: Number(song.duration) || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch playlist from API:', error);
    // empty array as fallback - handle gracefully
    return [];
  }
}

export async function getPlaylist(): Promise<SongType[]> {
  return await fetchPlaylist();
}

export async function getSongsByAlbum(albumTitle: string): Promise<SongType[]> {
  const playlist = await getPlaylist();
  return playlist.filter((song: SongType) => song.album === albumTitle);
}

export async function getSongsByArtist(artistName: string): Promise<SongType[]> {
  const playlist = await getPlaylist();
  return playlist.filter((song: SongType) => song.artist === artistName);
}

export async function findSongById(songId: string): Promise<SongType | null> {
  const playlist = await getPlaylist();
  return playlist.find((song: SongType) => song.id === songId) || null;
}

export async function getAlbums(): Promise<AlbumType[]> {
  try {
    const response = await fetch(getApiUrl('/api/albums'));
    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status}`);
    }

    const data = await response.json();
    const albums = data.success ? (data.data || data.albums || []) : (data.albums || data || []);

    return albums.map((album: Record<string, unknown>) => ({
      id: String(album.id),
      title: String(album.title || 'Untitled Album'),
      artist: String(album.artist || 'Unknown Artist'),
      cover: String(album.cover || album.cover_art_url || '/images/default-album.jpg'),
      year: Number(album.year) || new Date().getFullYear(),
      tracks: Number(album.tracks) || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch albums from API:', error);
    return [];
  }
}
