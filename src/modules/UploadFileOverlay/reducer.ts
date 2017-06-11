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

    // Update the current upload progress.
    case actions.UPDATE_PROGRESS:
      return {
        isActive: true,
        isUploading: true,
        progress: action.payload
      };

    // Default.
    default:
      return state;
  }
}
