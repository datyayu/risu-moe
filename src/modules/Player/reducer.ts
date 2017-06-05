import { Action } from "../../types";

export type PlayerState = {
  progress: number;
  isPlaying: boolean;
};

const initialState: PlayerState = {
  progress: 0,
  isPlaying: false
};

export function playerReducer(
  state: PlayerState = initialState,
  action: Action
): PlayerState {
  switch (action.type) {
    default:
      return state;
  }
}
