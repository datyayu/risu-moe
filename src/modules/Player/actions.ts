import { Action, CurrentSong } from "../../types";

/*******************
 *  ACTION TYPES   *
 *******************/

export const END_PLAYING = "player/END_PLAYING";
export const UPDATE_SONG = "player/UPDATE_SONG";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Notify that the playing has stopped.
 */
export function endPlaying(): Action {
  return { type: END_PLAYING };
}

/**
 * Update the current's song info.
 *
 * @param song Updated song info.
 */
export function updateSong(song: CurrentSong): Action {
  return {
    type: UPDATE_SONG,
    payload: song
  };
}
