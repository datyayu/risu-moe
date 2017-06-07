import { webSocketsService } from "../../services";
import { store } from "../../store";
import { CurrentSong } from "../../types";
import * as actions from "./actions";

export function init() {
  webSocketsService.addSongUpdatedListener((song: CurrentSong) => {
    const action = actions.updateSong(song);
    store.dispatch(action);
  });

  webSocketsService.addEndListener(() => {
    const action = actions.endPlaying();
    store.dispatch(action);
  });
}
