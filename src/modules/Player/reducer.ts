import { Action, CurrentSong } from "../../types";
import * as actions from "./actions";

export type PlayerState = {
  currentSong?: CurrentSong;
  isPlaying: boolean;
};

const initialState: PlayerState = {
  currentSong: undefined,
  isPlaying: false
};

export function playerReducer(
  state: PlayerState = initialState,
  action: Action
): PlayerState {
  switch (action.type) {
    case actions.UPDATE_SONG:
      return {
        isPlaying: true,
        currentSong: action.payload
      };

    case actions.END_PLAYING:
      return {
        isPlaying: false,
        currentSong: undefined
      };

    default:
      return state;
  }
}
