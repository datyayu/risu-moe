import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { Observable } from "rxjs/Observable";
import { Database, DataSnapshot } from "../types";
import { firebaseService } from "./_firebase";

/*******************
 *     SERVICE     *
 *******************/

class PlaylistService {
  database: Database;
  playlistSnapshot$: Observable<DataSnapshot>;

  constructor() {
    this.database = firebaseService.database();

    const playlistRef = this.database.ref("/playlist") as EventTargetLike;

    // Convert the playlist ref to an observable.
    this.playlistSnapshot$ = Observable.fromEvent(playlistRef, "value");
  }
}

// Export it as a singleton.
export const playlistService = new PlaylistService();
