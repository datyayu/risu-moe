import * as io from "socket.io-client";
import { CurrentSong } from "../types/Song";

type SongUpdatedCallback = (s: CurrentSong) => void;
type PlaylistEndCallback = () => void;

class WebSocketsService {
  io: SocketIOClient.Socket;
  songListeners: Array<SongUpdatedCallback>;
  endListeners: Array<PlaylistEndCallback>;

  constructor() {
    this.io = io("http://localhost:4000");
    this.songListeners = [];
    this.endListeners = [];

    this.notifyEnd = this.notifyEnd.bind(this);
    this.notifyUpdate = this.notifyUpdate.bind(this);

    this.io.on("end", this.notifyEnd);
    this.io.on("song-update", this.notifyUpdate);
  }

  addSongUpdatedListener(listener: SongUpdatedCallback) {
    this.songListeners.push(listener);
  }

  addEndListener(listener: PlaylistEndCallback) {
    this.endListeners.push(listener);
  }

  notifyEnd() {
    this.endListeners.forEach(listener => {
      listener();
    });
  }

  notifyUpdate(song: CurrentSong) {
    this.songListeners.forEach(listener => {
      listener(song);
    });
  }
}

export const webSocketsService = new WebSocketsService();
