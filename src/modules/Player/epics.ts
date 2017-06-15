import { Observable } from "rxjs/Observable";
import { playerService, webSocketsService } from "../../services";
import { CurrentSong, Action, ActionObservable, AppStore } from "../../types";
import * as actions from "./actions";
import * as Selectors from "./selectors";
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
    const state = store.getState();
    const currentSong = Selectors.getCurrentSong(state);

    // Song has changed.
    if (currentSong && currentSong.id !== song.id && song.currentTime === "1") {
      return Observable.from([actions.play(song.id), actions.updateSong(song)]);
    }

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
  actions$.ofType(actions.PLAY).switchMap(function(action: Action) {
    const bufferId = action.payload as string;
    const state = store.getState();
    const buffer = PlaylistSelectors.getBufferById(state, bufferId);

    if (!buffer) {
      return Observable.from([actions.bufferNotFound(bufferId)]);
    }

    const playPromise = playerService.playBuffer(buffer, bufferId);
    return Observable.fromPromise(playPromise).map(function(bufferId: string) {
      return actions.playStarted(bufferId);
    });
  });

const seek$ = (
  actions$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  actions$.ofType(actions.SEEK).map(function(action: Action) {
    const state = store.getState();
    const seekTime = action.payload as number;
    const isPlaying = Selectors.isPlayerPlaying(state);

    if (isPlaying) {
      playerService.seek(seekTime);
    }

    return actions.seekDone();
  });

const stopPlaying$ = (actions$: ActionObservable): Observable<Action> =>
  actions$.ofType(actions.STOP).map(function() {
    playerService.stop();

    return actions.stopped();
  });

// Export all epics.
export const epics = [
  updateCurrentSong$,
  notifyEndPlaying$,
  startPlaying$,
  seek$,
  stopPlaying$
];
