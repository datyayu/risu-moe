import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { Observable } from "rxjs/Observable";
import { database as fbdb } from "firebase";
import * as Rx from "rxjs";
import { firebaseService } from "./firebase";

class PlaylistService {
  database: fbdb.Database;
  playlistSnapshot$: Observable<fbdb.DataSnapshot>;

  constructor() {
    this.database = firebaseService.database();

    const playlistRef = this.database.ref("/playlist") as EventTargetLike;
    this.playlistSnapshot$ = Rx.Observable.fromEvent(playlistRef, "value");
  }
}

export const playlistService = new PlaylistService();
