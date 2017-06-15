import { playlistService } from "./playlist";

/*******************
 *     SERVICE     *
 *******************/

class PlayerService {
  private timeout: NodeJS.Timer;

  /**
   * Start tracking the current playing song
   * every second.
   */
  startTracking() {
    this.timeout = setInterval(playlistService.tick, 1000);
  }

  /**
   * Stop tracking the current playing song
   * every second.
   */
  stopTracking() {
    clearInterval(this.timeout);
  }
}

// Export it as a singleton.
export const playerService = new PlayerService();
