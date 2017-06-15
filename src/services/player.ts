/*******************
 *     SERVICE     *
 *******************/

/**
 * Player service uses the Web Audio API to take care
 * of the playback.
 *
 * WARNING: This is a very stateful service, so be
 * sure to take the appropiate precautions when
 * using it.
 */
class PlayerService {
  /*******************
   *  PRIVATE STUFF  *
   *******************/

  // Audio context stuff
  private audioContext: AudioContext;
  private buffer?: AudioBuffer;

  // Timers for seeking / restoring playback state.
  private pauseTime: number;
  private onPausePlaybackTime: number;
  private startTime: number;

  // Audio context nodes
  private sourceNode?: AudioBufferSourceNode;
  private volumeGainNode: GainNode;

  // Player options
  private hasBufferLoaded: boolean;
  private isPlaying: boolean;
  private volume: number;

  /*******************
   * SETUP DEFAULTS  *
   *******************/

  constructor() {
    this.audioContext = new AudioContext();

    this.onPausePlaybackTime = 0;
    this.pauseTime = 0;
    this.startTime = 0;

    this.volumeGainNode = this.audioContext.createGain();

    this.volume = 1;
    this.isPlaying = false;

    this.getUpdatedPlaybackTime = this.getUpdatedPlaybackTime.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.playBuffer = this.playBuffer.bind(this);
  }

  /*******************
   *  UTIL METHODS   *
   *******************/

  /**
   * Converts an ArrayBuffer to an AudioBuffer.
   *
   * @param buffer Buffer to convert.
   */
  arrayBufferToAudioBuffer(buffer: ArrayBuffer): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      this.audioContext.decodeAudioData(buffer, resolve, reject);
    });
  }

  /**
   * Get the current playback time, even if paused.
   */
  getUpdatedPlaybackTime(): number {
    return (Date.now() - this.startTime) / 1000 + this.onPausePlaybackTime;
  }

  getPlaybackTime(): number {
    if (!this.sourceNode) {
      return 0;
    }

    if (!this.isPlaying) {
      return this.onPausePlaybackTime;
    }

    return this.getUpdatedPlaybackTime();
  }

  /********************
   * PLAYBACK METHODS *
   ********************/

  /**
   * Pause the current playing buffer.
   */
  pause(): void {
    if (!this.isPlaying) return;
    if (!this.sourceNode) return;

    this.sourceNode.stop();
    this.isPlaying = false;

    // Update timers
    this.pauseTime = Date.now();
    this.onPausePlaybackTime = this.getUpdatedPlaybackTime();
  }

  /**
   * Play the current audio buffer.
   */
  play() {
    if (this.isPlaying || !this.hasBufferLoaded || !this.buffer) return;

    // Setup nodes
    this.volumeGainNode.gain.value = this.volume;
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.buffer;

    // Connect nodes.
    this.sourceNode.connect(this.volumeGainNode);
    this.volumeGainNode.connect(this.audioContext.destination);

    // Start playing from current offset (defaults to 0)
    this.sourceNode.start(0, this.onPausePlaybackTime);
    this.isPlaying = true;
    this.startTime = Date.now();
  }

  /**
   * Stop playing the current buffer.
   */
  stop(): void {
    if (!this.isPlaying) return;
    if (!this.sourceNode) return;

    this.sourceNode.stop(0);
    this.hasBufferLoaded = false;
    this.isPlaying = false;
    this.onPausePlaybackTime = 0;
  }

  /**
   * Play an audio buffer.
   */
  async playBuffer(rawBuffer: ArrayBuffer, bufferId: string): Promise<string> {
    this.stop();
    this.isPlaying = false;

    try {
      const convertedBuffer = await this.arrayBufferToAudioBuffer(rawBuffer);
      this.buffer = convertedBuffer;
      this.hasBufferLoaded = true;

      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = convertedBuffer;

      this.play();
    } catch (error) {
      console.error(error);
    }

    return bufferId;
  }

  /**
   * Seek the current buffer to the given time mark.
   *
   * @param time Time (ms) to seek to.
   */
  seek(time: number) {
    if (!this.sourceNode || !this.sourceNode.buffer) return;
    if (time > this.sourceNode.buffer.duration) return;

    // If it isn't playing, then just set the offset.
    if (!this.isPlaying) {
      this.onPausePlaybackTime = time;
      return;
    }

    this.pause();
    this.onPausePlaybackTime = time;

    // Browser requires a little time to process the pause and seek.
    setTimeout(this.play, 100);
  }
}

// Export it as a singleton.
export const playerService = new PlayerService();
