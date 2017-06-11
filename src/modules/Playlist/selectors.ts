import { AppState } from "../../store";
import { Song } from "../../types";

export function playlistIsMinimized(state: AppState): boolean {
  return state.playlist.minimized;
}

export function getPlaylistSongs(state: AppState): Array<Song> {
  return state.playlist.songs;
}

export function getCurrentSong(state: AppState): Song | undefined {
  return state.playlist.songs[0];
}

export function getNextSong(state: AppState): Song | undefined {
  return state.playlist.songs[1];
}

export function getBufferIds(state: AppState): Array<string> {
  return Object.keys(state.playlist.buffers);
}
