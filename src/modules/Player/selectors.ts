import { AppState, CurrentSong } from "../../types";

/**
 * Get the current playing time progress.
 */
export function getCurrentPlayerProgress(state: AppState): number {
  return state.player.currentSong
    ? parseInt(state.player.currentSong.currentTime, 10)
    : 0;
}

/**
 * Get the current playing song, if there is one.
 */
export function getCurrentSong(state: AppState): CurrentSong | undefined {
  return state.player.currentSong;
}

/**
 * Get the current song duration.
 */
export function getCurrentSongDuration(state: AppState): number {
  return state.player.currentSong
    ? parseInt(state.player.currentSong.duration, 10)
    : 1;
}

/**
 * Check if the player is currently playing a song.
 */
export function isPlayerPlaying(state: AppState): boolean {
  return state.player.isPlaying;
}
