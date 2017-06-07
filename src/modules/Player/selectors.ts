import { AppState } from "../../store";
import { CurrentSong } from "../../types/index";

export function getCurrentPlayerProgress(state: AppState): number {
  return state.player.currentSong
    ? parseInt(state.player.currentSong.currentTime, 10)
    : 0;
}

export function getCurrentSongDuration(state: AppState): number {
  return state.player.currentSong
    ? parseInt(state.player.currentSong.duration, 10)
    : 1;
}

export function playerIsPlaying(state: AppState): boolean {
  return state.player.isPlaying;
}

export function getCurrentPlayingSong(
  state: AppState
): CurrentSong | undefined {
  return state.player.currentSong;
}
