import { AppState } from "../../types";

/**
 * Check if there is an upload active.
 */
export function isUploading(state: AppState): boolean {
  return state.uploadFileOverlay.isUploading;
}

/**
 * Check if the uploading overlay is active.
 */
export function isUploadingFileOverlayActive(state: AppState): boolean {
  return state.uploadFileOverlay.isActive;
}

/**
 * Get the current upload progress.
 */
export function getCurrentUploadProgress(state: AppState): number {
  return state.uploadFileOverlay.progress;
}
