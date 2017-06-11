import { Observable } from "rxjs/Observable";
import { webSocketsService } from "../../services";
import { CurrentSong, Action } from "../../types";
import * as actions from "./actions";

/*******************
 *      EPICS      *
 *******************/

/**
 * When the current song is updated, update also the
 * local state copy.
 */
const updateCurrentSong$ = (): Observable<Action> =>
  webSocketsService.song$.map((song: CurrentSong) => {
    return actions.updateSong(song);
  });

/**
 * When the server has stopped playing, notify it to
 * the local state.
 */
const notifyEndPlaying$ = (): Observable<Action> =>
  webSocketsService.end$.map(() => {
    return actions.endPlaying();
  });

// Export all epics.
export const epics = [updateCurrentSong$, notifyEndPlaying$];
