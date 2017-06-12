import { Observable } from "rxjs/Observable";
import { Action, ActionObservable, AppStore, Song } from "../../types";
import { playlistService, cloudFilesService } from "../../services";
import * as Selectors from "./selectors";
import * as actions from "./actions";
import * as PlayerActions from "../Player/actions";

/*******************
 *      EPICS      *
 *******************/

/**
 * When remote playlist is updated, update also the local one.
 */
const setPlaylist$ = (action$: ActionObservable): Observable<Action> =>
  playlistService.playlist$.map(function(songs: Array<Song>) {
    if (!songs) {
      return actions.setPlaylist([]);
    }

    return actions.setPlaylist(songs);
  });

/**
 * When playlist is updated:
 * - Fetch the first song if required.
 * - If the first song has already been fetched but the
 *   second hasn't, then fetch the second one.
 * - If both were already fetched, then do nothing.
 */
const loadSongs$ = (
  action$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  action$.ofType(actions.SET_PLAYLIST).map(function(action: Action) {
    const songs = action.payload as Array<Song>;
    const state = store.getState();

    if (songs.length === 0) {
      return actions.noNeedToFetch();
    }

    // Try to fetch the first one.
    const firstSong = songs[0];
    const firstSongWasFetched = Selectors.isIdInBufferList(state, firstSong.id);

    if (!firstSongWasFetched) {
      return actions.fetchSong(firstSong);
    }

    // Try to fetch the second one.
    const secondSong = songs[1];
    const secondSongWasFetched = Selectors.isIdInBufferList(
      state,
      secondSong.id
    );

    if (!secondSongWasFetched) {
      return actions.fetchSong(secondSong);
    }

    // Do nothing.
    return actions.noNeedToFetch();
  });

/**
 * When a playlist/FETCH_SONG action is dispatched,
 * fetch the song and save the buffer in store.
 */
const fetchSong$ = (action$: ActionObservable): Observable<Action> =>
  action$.ofType(actions.FETCH_SONG).switchMap(function(action: Action) {
    const song = action.payload as Song;
    const request = cloudFilesService.fetchFile(song.url);

    return Observable.from(request).switchMap(buffer =>
      Observable.from([
        actions.setSongBuffer(song.id, buffer),
        actions.songFetched(song.id)
      ])
    );
  });

/**
 * When the a playlist/SONG_FETCHED action is
 * dispatched, check if the second song in playlist was
 * already fetched. If it hasn't, then fetch it.
 */
const fetchSecondSong$ = (
  action$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  action$.ofType(actions.SONG_FETCHED).map(function(action: Action) {
    const state = store.getState();
    const nextSong = Selectors.getNextSong(state);
    const nextSongWasFetched =
      nextSong && Selectors.getBufferIds(state).some(id => id === nextSong.id);

    if (!nextSong || nextSongWasFetched) {
      return actions.noNeedToFetch();
    }

    return actions.fetchSong(nextSong);
  });

const playFetchedSong$ = (
  actions$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  actions$.ofType(actions.SONG_FETCHED).map(action => {
    const songId = action.payload as string;
    const state = store.getState();
    const currentSong = Selectors.getCurrentSong(state);

    if (currentSong && songId === currentSong.id) {
      return PlayerActions.play(songId);
    }

    return actions.noNeedToPlay();
  });

// Export all epics.
export const epics = [
  fetchSong$,
  fetchSecondSong$,
  loadSongs$,
  playFetchedSong$,
  setPlaylist$
];
