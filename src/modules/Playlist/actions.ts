import { Song, Action } from "../../types";

/*******************
 *  ACTION TYPES   *
 *******************/

export const FETCH_SONG = "playlist/FETCH_SONG";
export const FETCH_SECOND_SONG = "playlist/FETCH_SECOND_SONG";
export const SET_PLAYLIST = "playlist/SET_PLAYLIST";
export const SET_SONG_BUFFER = "playlist/SET_SONG_BUFFER";
export const SONG_FETCHED = "playlist/SONG_FETCHED";
export const TOGGLE_PLAYLIST = "playlist/TOGGLE_PLAYLIST";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Fetch a song's arraybuffer.
 *
 * @param song Song to fetch.
 */
export function fetchSong(song: Song): Action {
  return {
    type: FETCH_SONG,
    payload: song
  };
}

/**
 * Prefetch the next song.
 *
 * @param song Song to fetch.
 */
export function fetchSecondSong(song: Song): Action {
  return {
    type: FETCH_SECOND_SONG,
    payload: song
  };
}

/**
 * Set playlist songs.
 *
 * @param songs Songs in playlist.
 */
export function setPlaylist(songs: Array<Song>): Action {
  return {
    type: SET_PLAYLIST,
    payload: songs
  };
}

/**
 * Store the song arraybuffer in the state.
 *
 * @param id Song id
 * @param buffer Buffer to store.
 */
export function setSongBuffer(id: string, buffer: ArrayBuffer): Action {
  return {
    type: SET_SONG_BUFFER,
    payload: { id, buffer }
  };
}

/**
 * Notify when the current song buffer has been
 * fetched successfully
 */
export function songFetched(): Action {
  return { type: SONG_FETCHED };
}

/**
 * Toggle the playlist visibility.
 */
export function togglePlaylist(): Action {
  return { type: TOGGLE_PLAYLIST };
}
