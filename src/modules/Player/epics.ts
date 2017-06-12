import { Observable } from "rxjs/Observable";
import { playerService, webSocketsService } from "../../services";
import { CurrentSong, Action, ActionObservable, AppStore } from "../../types";
import * as actions from "./actions";
import * as PlaylistSelectors from "../Playlist/selectors";

/*******************
 *      EPICS      *
 *******************/

/**
 * When the current song is updated, update also the
 * local state copy. Also try to keep the playing time
 * in-sync with the remote source.
 */
const updateCurrentSong$ = (
  actions$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  webSocketsService.song$.switchMap((song: CurrentSong) => {
    const localPlayingTime = playerService.getPlaybackTime();
    const remotePlayingTime = parseInt(song.currentTime, 10) - 1; // Current is behind by 1

    // +/- 2 seconds offset.
    const isLocalPlayingBehind = localPlayingTime + 2 < remotePlayingTime;
    const isLocalPlayingAhead = localPlayingTime - 2 > remotePlayingTime;

    // If behind or ahead, force to sync.
    if (isLocalPlayingBehind || isLocalPlayingAhead) {
      return Observable.from([
        actions.updateSong(song),
        actions.seek(remotePlayingTime)
      ]);
    }

    return Observable.from([actions.updateSong(song)]);
  });

/**
 * When the server has stopped playing, notify it to
 * the local state.
 */
const notifyEndPlaying$ = (): Observable<Action> =>
  webSocketsService.end$.map(() => {
    return actions.endPlaying();
  });

/**
 * Start playing when the playback is requested.
 */
const startPlaying$ = (
  actions$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  actions$.ofType(actions.PLAY).map(function(action: Action) {
    const bufferId = action.payload as string;
    const state = store.getState();
    const buffer = PlaylistSelectors.getBufferById(state, bufferId);

    if (!buffer) {
      return actions.bufferNotFound(bufferId);
    }

    playerService.playBuffer(buffer);
    return actions.playStarted(bufferId);
  });

const seek$ = (actions$: ActionObservable): Observable<Action> =>
  actions$.ofType(actions.SEEK).map(function(action: Action) {
    const seekTime = action.payload as number;

    playerService.seek(seekTime);
    return actions.seekDone();
  });

// Export all epics.
export const epics = [
  updateCurrentSong$,
  notifyEndPlaying$,
  startPlaying$,
  seek$
];
