import { Action, CurrentSong } from "../../types";
import * as actions from "./actions";

/*******************
 *      STATE      *
 *******************/

export type State = {
  currentSong?: CurrentSong;
  isPlaying: boolean;
};

const initialState: State = {
  currentSong: undefined,
  isPlaying: false
};

/*******************
 *     REDUCER     *
 *******************/

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    // Update currently playing song data.
    case actions.UPDATE_SONG:
      return {
        ...state,
        currentSong: action.payload
      };

    case actions.STOP:
    case actions.BUFFER_NOT_FOUND:
      return {
        ...state,
        isPlaying: false
      };

    case actions.PLAY_STARTED:
      return {
        ...state,
        isPlaying: true
      };

    // End playing.
    case actions.END_PLAYING:
      return {
        isPlaying: false,
        currentSong: undefined
      };

    // Default.
    default:
      return state;
  }
}
