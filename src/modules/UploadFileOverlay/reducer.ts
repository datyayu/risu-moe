import { Action } from "../../types";
import * as actions from "./actions";

export type UploadFileOverlayState = {
  isActive: boolean;
  isUploading: boolean;
  progress: number;
};

const initialState: UploadFileOverlayState = {
  isActive: false,
  isUploading: false,
  progress: 0
};

export function uploadFileOverlayReducer(
  state: UploadFileOverlayState = initialState,
  action: Action
): UploadFileOverlayState {
  switch (action.type) {
    case actions.SHOW_OVERLAY:
      return {
        ...state,
        isActive: true
      };

    case actions.HIDE_OVERLAY:
      return {
        progress: 0,
        isActive: false,
        isUploading: false
      };

    case actions.UPDATE_PROGRESS:
      return {
        isActive: true,
        isUploading: true,
        progress: action.payload
      };

    default:
      return state;
  }
}
