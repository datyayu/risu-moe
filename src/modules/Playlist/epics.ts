import { Observable } from "rxjs/Observable";
import { Store } from "redux";
import { ActionsObservable } from "redux-observable";
import { database as fbdb } from "firebase";
import { AppState } from "../../store";
import { Action, Song } from "../../types";
import { playlistService, cloudFilesService } from "../../services";
import * as Selectors from "./selectors";
import * as actions from "./actions";
import * as SharedActions from "../../shared-actions";

const setPlaylist$ = (action$: ActionsObservable<Action>): Observable<Action> =>
  playlistService.playlistSnapshot$.map(function(snapshot: fbdb.DataSnapshot) {
    var db = snapshot.val();
    if (!db) return SharedActions.nullAction();

    var songs = Object.keys(db).map(function(key: string) {
      return db[key];
    });

    return actions.setPlaylist(songs);
  });

const loadSongs$ = (
  action$: ActionsObservable<Action>,
  store: Store<AppState>
): Observable<Action> =>
  action$.ofType(actions.SET_PLAYLIST).map(function(action: Action) {
    const songs = action.payload as Array<Song>;

    const firstSong = songs[0];
    const secondSong = songs[1];

    const state = store.getState() as AppState;
    const nextSong = Selectors.getNextSong(state);
    const firstSongWasntNextOnPlaylist =
      !nextSong || firstSong.id !== nextSong.id;

    if (firstSong && firstSongWasntNextOnPlaylist) {
      return actions.fetchSong(firstSong);
    }

    if (secondSong) {
      return actions.fetchSong(secondSong);
    }

    return SharedActions.nullAction();
  });

const fetchSong$ = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.ofType(actions.FETCH_SONG).switchMap(function(action: Action) {
    const song = action.payload as Song;
    const request = cloudFilesService.fetchFile(song.url);

    return Observable.from(request).switchMap(buffer =>
      Observable.from([
        actions.setSongBuffer(song.id, buffer),
        actions.currentSongFetched()
      ])
    );
  });

const fetchSecondSong$ = (
  action$: ActionsObservable<Action>,
  store: Store<AppState>
): Observable<Action> =>
  action$
    .ofType(actions.CURRENT_SONG_FETCHED)
    .map(function(action: Action) {
      const state = store.getState();
      const nextSong = Selectors.getNextSong(state);
      const nextSongWasFetched =
        nextSong &&
        Selectors.getBufferIds(state).some(id => id === nextSong.id);

      if (nextSongWasFetched) {
        return SharedActions.nullAction();
      }

      return action;
    })
    .map(function(action: Action) {
      const state = store.getState();
      const nextSong = Selectors.getNextSong(state);

      if (action.type !== actions.CURRENT_SONG_FETCHED || !nextSong) {
        return SharedActions.nullAction();
      }

      return actions.fetchSong(nextSong);
    });

export const epics = [setPlaylist$, loadSongs$, fetchSong$, fetchSecondSong$];
