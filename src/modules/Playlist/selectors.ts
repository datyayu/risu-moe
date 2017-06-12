import { AppState, Song } from "../../types";

/**
 * Get the list of song ids in the buffer list.
 */
export function getBufferIds(state: AppState): Array<string> {
  return Object.keys(state.playlist.buffers);
}

/**
 * Get a buffer by its id, if it exists.
 *
 * @param id Buffer id to fetch.
 */
export function getBufferById(
  state: AppState,
  id: string
): ArrayBuffer | undefined {
  return state.playlist.buffers[id];
}

/**
 * Get the current song in playlist, if it exists.
 */
export function getCurrentSong(state: AppState): Song | undefined {
  return state.playlist.songs[0];
}

/**
 * Get next song in playlist, if it exists.
 */
export function getNextSong(state: AppState): Song | undefined {
  return state.playlist.songs[1];
}

/**
 * Get all the songs in the current playlist.
 */
export function getPlaylistSongs(state: AppState): Array<Song> {
  return state.playlist.songs;
}

/**
 * Check if an id is already associated to a buffer.
 *
 * @param id Id to check.
 */
export function isIdInBufferList(state: AppState, id: string): boolean {
  const bufferList = getBufferIds(state);

  return bufferList.some(bufferId => bufferId === id);
}

/**
 * Check if the playlist is minimized.
 */
export function isPlaylistMinimized(state: AppState): boolean {
  return state.playlist.minimized;
}
