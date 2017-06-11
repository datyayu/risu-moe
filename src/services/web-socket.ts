import * as io from "socket.io-client";
import { Subject } from "rxjs/Subject";
import { CurrentSong } from "../types/Song";
import { WS_SERVER_URL } from "../config/ws";

/*******************
 *     SERVICE     *
 *******************/

class WebSocketsService {
  io: SocketIOClient.Socket;
  song$: Subject<CurrentSong>;
  end$: Subject<{}>;

  constructor() {
    this.io = io(WS_SERVER_URL);

    this.song$ = new Subject();
    this.end$ = new Subject();

    // Setup bindings.
    this.notifyEnd = this.notifyEnd.bind(this);
    this.notifyUpdate = this.notifyUpdate.bind(this);

    // WS Listeners.
    this.io.on("end", this.notifyEnd);
    this.io.on("song-update", this.notifyUpdate);
  }

  /*******************
   * UPDATE HANDLERS *
   *******************/

  /**
   * Push an entry to the `end$` Subject stream
   * when a "end" message is received.
   */
  notifyEnd() {
    this.end$.next();
  }

  /**
   * Push an update to the `song$` Subject stream
   * when a song update is received.
   *
   * @param song Updated current song.
   */
  notifyUpdate(song: CurrentSong) {
    this.song$.next(song);
  }
}

// Export it as a singleton.
export const webSocketsService = new WebSocketsService();
