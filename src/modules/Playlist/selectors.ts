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
