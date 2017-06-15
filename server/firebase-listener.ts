import { CurrentSong } from "./types/Song";
import { firebaseService } from "./services/_firebase";
import { playlistService } from "./services/playlist";

/*******************
 *  DB REFERENCES  *
 *******************/

const database = firebaseService.database();
const playlistRef = database.ref("/playlist");

/*******************
 *    LISTENER     *
 *******************/

/**
 * Whenever an entry is added to the remote playlist, add
 * it to the local db playlist as well.
 */
playlistRef.on("child_added", async function(snapshot) {
  if (!snapshot) return;

  const song: CurrentSong = snapshot.val();

  if (!song) return;

  await playlistService.addSong(song);
});
