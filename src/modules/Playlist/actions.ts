import { Song, Action } from "../../types";

export const TOGGLE_PLAYLIST = "playlist/TOGGLE_PLAYLIST";
export function togglePlaylist(): Action {
  return { type: TOGGLE_PLAYLIST };
}

export const SET_PLAYLIST = "playlist/SET_PLAYLIST";
export function setPlaylist(songs: Array<Song>): Action {
  return {
    type: SET_PLAYLIST,
    payload: songs
  };
}

export const FETCH_SONG = "playlist/FETCH_SONG";
export function fetchSong(song: Song): Action {
  return {
    type: FETCH_SONG,
    payload: song
  };
}

export const CURRENT_SONG_FETCHED = "playlist/CURRENT_SONG_FETCHED";
export function currentSongFetched(): Action {
  return { type: CURRENT_SONG_FETCHED };
}

export const SET_SONG_BUFFER = "playlist/SET_SONG_BUFFER";
export function setSongBuffer(id: string, buffer: ArrayBuffer): Action {
  return {
    type: SET_SONG_BUFFER,
    payload: { id, buffer }
  };
}

export const FETCH_SECOND_SONG = "playlist/FETCH_SECOND_SONG";
export function fetchSecondSong(song: Song): Action {
  return {
    type: FETCH_SECOND_SONG,
    payload: song
  };
}
