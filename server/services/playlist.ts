import * as https from "https";
import * as redis from "redis";
import { promisifyAll } from "bluebird";
import { Song, CurrentSong } from "../types/Song";

/*******************
 *   REDIS SETUP   *
 *******************/

promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

/*******************
 *     CONFIG      *
 *******************/

const FIREBASE_DELETE_ENDPOINT =
  "https://us-central1-risu-moe.cloudfunctions.net/deleteSong";

/*******************
 *      TYPES      *
 *******************/

type SongCallback = (s?: CurrentSong | string) => any;

/*******************
 *     SERVICE     *
 *******************/

class PlaylistService {
  private client: any;
  private listeners: Array<SongCallback>;

  /*******************
   *   INITIALIZE    *
   *******************/

  constructor() {
    this.client = redis.createClient();
    this.listeners = [];

    this.tick = this.tick.bind(this);
    this.addSongChangeListener = this.addSongChangeListener.bind(this);
    this.getFirstSongFromPlaylist = this.getFirstSongFromPlaylist.bind(this);
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.notifyChanges = this.notifyChanges.bind(this);
  }

  /*******************
   *  SUBSCRIPTIONS  *
   *******************/

  /**
   * Register a new change listener.
   *
   * @param listener Function to be called on song change.
   */
  addSongChangeListener(listener: SongCallback): void {
    this.listeners = [...this.listeners, listener];
  }

  /**
   * Notify all the registered listeners about the
   * new change.
   */
  async notifyChanges() {
    const currentSong = await this.getCurrentSong();

    this.listeners.forEach(listener => {
      // If no song playing, just send a message.
      if (!currentSong) {
        listener("no song");
        return;
      }

      // If something is playing, then send the song info.
      listener(currentSong);
    });
  }

  /*******************
   *  PLAYING LOOP   *
   *******************/

  /**
   * Check the first song from playlist and try to play it.
   * - If playlist is empty, just clean the currentSong ref.
   * - If no song is playing, take the one at the start of
   *   the playlist, then start playing it.
   * - If already playing, increment the current playing time
   *   by one second.
   * - If the current playing time is longer than the song
   *   duration, pop that song from the playlist and try to
   *   play the next one on the next tick.
   *
   * This method is intended to be called once per second.
   */
  async tick() {
    try {
      // Get songId from playlist
      const songFromPlaylist = await this.getFirstSongFromPlaylist();
      let currentSong = await this.getCurrentSong();

      // No songs in playlist, keep everything clean.
      if (!songFromPlaylist) {
        await this.removeCurrentSong();
        return;
      }

      // No song is registered as playing, play the one from the playlist.
      if (!currentSong) {
        // -1 will be incremented later so it will send 0 to the client.
        currentSong = { ...songFromPlaylist, currentTime: "-1" };
        await this.setCurrentSong(currentSong);
      }

      const currentTime = parseInt(currentSong.currentTime);
      const songDuration = parseInt(songFromPlaylist.duration);

      // If song ended its duration, play next song.
      if (currentTime >= songDuration) {
        const oldSongId = await this.popCurrentSong();
        const newSong = await this.getFirstSongFromPlaylist();

        await this.removeSongFromFirebase(oldSongId);

        if (!newSong) {
          await this.removeCurrentSong();
          this.notifyChanges();
          return;
        }

        await this.setCurrentSong({ ...newSong, currentTime: "0" });
        return;
      }

      // Update current reference.
      await this.updateCurrentSong();
      this.notifyChanges();
    } catch (error) {
      // On error, clear the current song ref.
      console.log(error);
    }
  }

  /*******************
   *  READ METHODS   *
   *******************/

  /**
   * Get the current playing song, if there's one.
   */
  async getCurrentSong(): Promise<CurrentSong | undefined> {
    const song: CurrentSong = await this.client.hgetallAsync("currentSong");
    return song;
  }

  /**
   * Get the current song playing.
   */
  async getFirstSongFromPlaylist(): Promise<Song | undefined> {
    try {
      const songIdFromPlaylist = await this.client.lindexAsync("playlist", 0);

      if (!songIdFromPlaylist) return;

      const songFromPlaylist: Song = await this.client.hgetallAsync(
        songIdFromPlaylist
      );

      return songFromPlaylist;
    } catch (e) {
      return undefined;
    }
  }

  /*******************
   *  WRITE METHODS  *
   *******************/

  /**
   * Remove the first song from the playlist and get its id.
   */
  async popCurrentSong(): Promise<string> {
    return await this.client.lpopAsync("playlist");
  }

  /**
   * Remove the current song reference from db.
   */
  async removeCurrentSong(): Promise<void> {
    await this.client.hdelAsync(
      "currentSong",
      "id",
      "url",
      "duration",
      "name",
      "user",
      "ref",
      "currentTime"
    );
  }

  /**
   * Trigger an http cloud function to remove
   * a song from the playlist.
   *
   * @param songId Song id to remove.
   */
  async removeSongFromFirebase(songId: string): Promise<{}> {
    return new Promise(function(resolve) {
      https.get(`${FIREBASE_DELETE_ENDPOINT}?id=${songId}`, () => resolve());
    });
  }

  /**
  * Force the current song ref value to a given song.
  *
  * @param song Song to set.
  */
  async setCurrentSong(song: CurrentSong): Promise<void> {
    await this.client.hmsetAsync("currentSong", song);
  }

  /**
   * Update the current song by adding one more second to
   * the current playing time.
   */
  async updateCurrentSong(): Promise<void> {
    const currentSong = await this.getCurrentSong();

    const updatedCurrentSong = {
      ...currentSong,
      currentTime: currentSong && currentSong.currentTime
        ? parseInt(currentSong.currentTime) + 1
        : 0
    };

    await this.client.hmsetAsync("currentSong", updatedCurrentSong);
  }

  /**
   * Add a song to the database playlist.
   *
   * @param song Song to add.
   */
  async addSong(song: Song): Promise<void> {
    await this.client.hmsetAsync(song.id, song);
    await this.client.rpushAsync("playlist", song.id);
  }
}

// Export it as a singleton.
export const playlistService = new PlaylistService();
