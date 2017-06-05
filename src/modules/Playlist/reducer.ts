import { Song, Action } from "../../types";
import * as actions from "./actions";

export type PlaylistState = {
  songs: Array<Song>;
  minimized: boolean;
};

const initialState: PlaylistState = {
  songs: [],
  minimized: false
};

export function playlistReducer(
  state: PlaylistState = initialState,
  action: Action
): PlaylistState {
  switch (action.type) {
    case actions.SET_PLAYLIST:
      return {
        ...state,
        songs: action.payload
      };

    case actions.TOGGLE_PLAYLIST:
      return {
        ...state,
        minimized: !state.minimized
      };

    default:
      return state;
  }
}
