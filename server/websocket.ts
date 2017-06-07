import { playlistService } from "./services/playlist";
import { webSocketsService } from "./services/websocket";
import { CurrentSong } from "./types/Song";

export function init() {
  playlistService.addSongChangeListener(function(song: CurrentSong | string) {
    if (typeof song === "string") {
      webSocketsService.broadcastMessage("end", {});
      return;
    }

    webSocketsService.broadcastMessage("song-update", song);
  });
}
