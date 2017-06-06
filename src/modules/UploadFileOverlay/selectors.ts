import { AppState } from "../../store";

export function isUploading(state: AppState): boolean {
  return state.uploadFileOverlay.isUploading;
}

export function isUploadingFileOverlayActive(state: AppState): boolean {
  return state.uploadFileOverlay.isActive;
}

export function getCurrentUploadProgress(state: AppState): number {
  return state.uploadFileOverlay.progress;
}
