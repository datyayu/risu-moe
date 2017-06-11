import { Observable } from "rxjs/Observable";
import {
  Action,
  ActionObservable,
  AppStore,
  Song,
  DataSnapshot
} from "../../types";
import { playlistService, cloudFilesService } from "../../services";
import * as Selectors from "./selectors";
import * as actions from "./actions";

/*******************
 *      EPICS      *
 *******************/

/**
 * When remote playlist is updated, update also the local one.
 */
const setPlaylist$ = (action$: ActionObservable): Observable<Action> =>
  playlistService.playlistSnapshot$.map(function(snapshot: DataSnapshot) {
    var db = snapshot.val();

    if (!db) {
      return actions.errorUpdatingPlaylist();
    }

    var songs = Object.keys(db).map(function(key: string) {
      return db[key];
    });

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
        actions.songFetched()
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

// Export all epics.
export const epics = [setPlaylist$, loadSongs$, fetchSong$, fetchSecondSong$];
