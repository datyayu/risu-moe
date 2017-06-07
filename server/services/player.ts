import { playlistService } from "./playlist";

class PlayerService {
  timeout: NodeJS.Timer;

  startTracking() {
    this.timeout = setInterval(playlistService.tick, 1000);
  }

  stopTracking() {
    clearInterval(this.timeout);
  }
}

export const playerService = new PlayerService();
