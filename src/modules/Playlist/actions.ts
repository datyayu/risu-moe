import { Song, Action } from "../../types";

export const TOGGLE_PLAYLIST = "playlist/TOGGLE_PLAYLIST";
export const SET_PLAYLIST = "playlist/SET_PLAYLIST";

export function togglePlaylist(): Action {
  return { type: TOGGLE_PLAYLIST };
}

export function setPlaylist(songs: Array<Song>): Action {
  return {
    type: SET_PLAYLIST,
    payload: songs
  };
}
