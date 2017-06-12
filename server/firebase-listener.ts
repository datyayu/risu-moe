import { firebaseService } from "./services/_firebase";
import { playlistService } from "./services/playlist";
import { CurrentSong } from "./types/Song";

const database = firebaseService.database();

database.ref("/playlist").on("child_added", async function(snapshot) {
  if (!snapshot) return;

  const song: CurrentSong = snapshot.val();

  if (!song) return;

  await playlistService.addSong(song);
});
