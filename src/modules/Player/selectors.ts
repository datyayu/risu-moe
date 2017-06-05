import { AppState } from "../../store";

export function getCurrentPlayerProgress(state: AppState): number {
  return state.player.progress;
}

export function playerIsPlaying(state: AppState): boolean {
  return state.player.isPlaying;
}
