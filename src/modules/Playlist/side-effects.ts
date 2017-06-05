import { store } from "../../store";
import { playlistService } from "../../services";
import * as actions from "./actions";

export function init() {
  playlistService.addPlaylistChangeListener(function(songList) {
    const action = actions.setPlaylist(songList);
    store.dispatch(action);
  });
}
