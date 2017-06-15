import { Action } from "../../types";
import * as actions from "./actions";

/*******************
 *      STATE      *
 *******************/

export type State = {
  isActive: boolean;
  isUploading: boolean;
  progress: number;
};

const initialState: State = {
  isActive: false,
  isUploading: false,
  progress: 0
};

/*******************
 *     REDUCER     *
 *******************/

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    // Show upload overlay.
    case actions.SHOW_OVERLAY:
      return {
        ...state,
        isActive: true
      };

    // Hide upload overlay.
    case actions.HIDE_OVERLAY:
      return {
        progress: 0,
        isActive: false,
        isUploading: false
      };

    // Uploading has started, show the upload progress.
    case actions.START_UPLOADING:
      return {
        progress: 0,
        isActive: true,
        isUploading: true
      };

    // Update the current upload progress.
    case actions.UPDATE_PROGRESS:
      return {
        isActive: true,
        isUploading: true,
        progress: action.payload
      };

    // Uploading process has finished, hide the overlay.
    case actions.SONG_ADDED_TO_PL:
      return {
        isActive: false,
        isUploading: false,
        progress: 0
      };

    // Default.
    default:
      return state;
  }
}
