import { database as fbdb } from "firebase";
import { firebaseService } from "./firebase";
import { Song } from "../types";

type PlaylistChangeListenerCallback = (a: Array<Song>) => void;

class PlaylistService {
  database: fbdb.Database;

  constructor() {
    this.database = firebaseService.database();
  }

  addPlaylistChangeListener(handler: PlaylistChangeListenerCallback): void {
    // Retrieve playlist
    this.database
      .ref("/playlist")
      .on("value", function(snapshot: fbdb.DataSnapshot) {
        var db = snapshot.val();
        if (!db) return;

        var songs = Object.keys(db).map(function(key) {
          return db[key];
        });

        handler(songs);
      });
  }
}

export const playlistService = new PlaylistService();
