import { store } from "../../store";
import { Song } from "../../types";
import { playlistService } from "../../services";
import * as actions from "./actions";

export function init() {
  playlistService.addPlaylistChangeListener(function(songList: Array<Song>) {
    const action = actions.setPlaylist(songList);
    store.dispatch(action);
  });
}
