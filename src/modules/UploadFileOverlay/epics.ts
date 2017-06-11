import { Observable } from "rxjs/Observable";
import { Action, ActionObservable, AppStore, SongMetadata } from "../../types";
import {
  usersService,
  cloudFilesService,
  FileUploadUpdate
} from "../../services";
import * as actions from "./actions";
import * as Selectors from "./selectors";
import { actions as SharedActions } from "../../shared";

// Audio Element to get the file duration before uploading.
const audioElement = document.createElement("AUDIO") as HTMLAudioElement;

/**
 * On drag over, show the overlay.
 */
const handleDragOver$ = (): Observable<Action> =>
  Observable.fromEvent(document.body, "dragover").map(function(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = "copy";

    return actions.showOverlay();
  });

/**
 * On drag leave, hide the overlay.
 */
const handleDragLeave$ = (): Observable<Action> =>
  Observable.fromEvent(document.body, "dragleave").map(function(
    evt: DragEvent
  ) {
    return actions.hideOverlay();
  });

/**
 * On drop, get the file info and then request to upload it.
 * If something's wrong, just close the overlay.
 */
const handleFileDrop$ = (
  action: ActionObservable,
  store: AppStore
): Observable<Action> =>
  Observable.fromEvent(document.body, "drop").switchMap((evt: DragEvent) => {
    evt.preventDefault();
    evt.stopPropagation();

    // Get required info
    const files = evt.dataTransfer.files;
    const file = files[0];
    const user = usersService.getLocalUser();

    const state = store.getState();
    const isUploading = Selectors.isUploading(state);

    // Make sure the file it's correct and a user exists.
    if (isUploading || !user || !file || !file.type.startsWith("audio")) {
      return Observable.from([actions.hideOverlay()]);
    }

    // Get the file name.
    const filenameMatch = file.name.match(/(.*)\.[^.]+$/);
    if (!filenameMatch) return Observable.from([actions.hideOverlay()]);

    const filename = filenameMatch[1];

    // Setup to get duration.
    var fileUrl = URL.createObjectURL(file);
    audioElement.src = fileUrl;

    return (
      Observable.fromEvent(audioElement, "canplaythrough")
        // On "canplaythrought", get the duration and start uploading.
        .switchMap(function(uploadEvent: Event) {
          const metadata: SongMetadata = {
            id: undefined,
            name: filename,
            duration: (uploadEvent.currentTarget as HTMLAudioElement).duration.toString(),
            userId: user.id,
            userName: user.name
          };

          return Observable.from([actions.startUploading(file, metadata)]);
        })
    );
  });

/**
 * On file upload requested, upload it to the cloud storage.
 */
const startUploadingFile$ = (actions$: ActionObservable) =>
  actions$.ofType(actions.START_UPLOADING).map((action: Action) => {
    const file = action.payload.file as File;
    const metadata = action.payload.metadata as SongMetadata;

    cloudFilesService.uploadFile(file, metadata);

    return actions.uploadingStarted();
  });

/**
 * When the file upload progress is updated, also update the
 * local state to reflect the current progress.
 */
const updateUploadingProgress$ = (
  action$: ActionObservable
): Observable<Action> =>
  cloudFilesService.fileUploadTask$.map(function(update: FileUploadUpdate) {
    if (update.done || update.error) {
      return actions.hideOverlay();
    }

    if (!update.progress) {
      return SharedActions.nullAction();
    }

    return actions.updateProgress(update.progress);
  });

// Export all epics.
export const epics = [
  handleDragOver$,
  handleDragLeave$,
  handleFileDrop$,
  startUploadingFile$,
  updateUploadingProgress$
];
