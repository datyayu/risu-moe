import { Database, DataSnapshot, Song } from "../types";
import { firebaseService } from "./_firebase";
import { Subject } from "rxjs/Subject";

/*******************
 *     SERVICE     *
 *******************/

class PlaylistService {
  database: Database;
  playlist$: Subject<Array<Song>>;

  constructor() {
    this.database = firebaseService.database();
    this.playlist$ = new Subject();

    const playlistRef = this.database.ref("/playlist");
    this.handlePlaylistUpdate = this.handlePlaylistUpdate.bind(this);

    // Convert the playlist ref to an observable.
    playlistRef.on("value", this.handlePlaylistUpdate);
  }

  handlePlaylistUpdate(snapshot: DataSnapshot) {
    const db = snapshot.val();

    if (!db) {
      return this.playlist$.next();
    }

    const songs: Array<Song> = Object.keys(db).map(function(key: string) {
      return db[key];
    });

    this.playlist$.next(songs);
  }
}

// Export it as a singleton.
export const playlistService = new PlaylistService();
