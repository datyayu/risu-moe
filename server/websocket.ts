import { CurrentSong } from "./types/Song";
import { playlistService } from "./services/playlist";
import { webSocketsService } from "./services/websocket";

/**
 * Initialize the listener for song updates.
 */
export function init() {
  playlistService.addSongChangeListener(function(song: CurrentSong | string) {
    // If `song` is a string, that means the song ended.
    if (typeof song === "string") {
      webSocketsService.broadcastMessage("end", {});
      return;
    }

    // If song is a `CurrentSong`-type, that means it's an update.
    webSocketsService.broadcastMessage("song-update", song);
  });
}
