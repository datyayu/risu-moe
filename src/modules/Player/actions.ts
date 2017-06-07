import { Action, CurrentSong } from "../../types";

export const UPDATE_SONG = "player/UPDATE_SONG";
export const END_PLAYING = "player/END_PLAYING";

export function updateSong(song: CurrentSong): Action {
  return {
    type: UPDATE_SONG,
    payload: song
  };
}

export function endPlaying(): Action {
  return { type: END_PLAYING };
}
