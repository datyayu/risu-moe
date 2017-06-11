import { Action, SongMetadata } from "../../types";

/*******************
 *  ACTION TYPES   *
 *******************/

export const ERROR_UPDATING_PROGRESS =
  "uploadFileOverlay/ERROR_UPDATING_PROGRESS";
export const HIDE_OVERLAY = "uploadFileOverlay/HIDE_OVERLAY";
export const SHOW_OVERLAY = "uploadFileOverlay/SHOW_OVERLAY";
export const START_UPLOADING = "uploadFileOverlay/START_UPLOADING";
export const UPDATE_PROGRESS = "uploadFileOverlay/UPDATE_PROGRESS";
export const UPLOADING_STARTED = "uploadFileOverlay/UPLOADING_STARTED";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Progress property was missing on a upload progress update.
 */
export function errorUpdatingProgress(): Action {
  return { type: ERROR_UPDATING_PROGRESS };
}

/**
 * Hide upload overlay.
 */
export function hideOverlay(): Action {
  return { type: HIDE_OVERLAY };
}

/**
 * Show upload overlay.
 */
export function showOverlay(): Action {
  return { type: SHOW_OVERLAY };
}

/**
 * Upload a given file to cloud storage.
 *
 * @param file File to upload.
 * @param metadata Metadata to store with the file.
 */
export function startUploading(file: File, metadata: SongMetadata): Action {
  return {
    type: START_UPLOADING,
    payload: { file, metadata }
  };
}

/**
 * Update the current upload progress displayed.
 *
 * @param progress Current uploading progress.
 */
export function updateProgress(progress: number): Action {
  return { type: UPDATE_PROGRESS, payload: progress };
}

/**
 * Notify that an upload has started.
 */
export function uploadingStarted(): Action {
  return { type: UPLOADING_STARTED };
}
