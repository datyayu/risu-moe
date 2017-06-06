import { Action } from "../../types";

export const SHOW_OVERLAY = "uploadFileOverlay/SHOW_OVERLAY";
export const HIDE_OVERLAY = "uploadFileOverlay/HIDE_OVERLAY";
export const UPDATE_PROGRESS = "uploadFileOverlay/UPDATE_PROGRESS";

export function showOverlay(): Action {
  return { type: SHOW_OVERLAY };
}

export function hideOverlay(): Action {
  return { type: HIDE_OVERLAY };
}

export function updateProgress(progress: number): Action {
  return { type: UPDATE_PROGRESS, payload: progress };
}
