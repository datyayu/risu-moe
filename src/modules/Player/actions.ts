import { Action, CurrentSong } from "../../types";

/*******************
 *  ACTION TYPES   *
 *******************/

export const BUFFER_NOT_FOUND = "player/BUFFER_NOT_FOUND";
export const END_PLAYING = "player/END_PLAYING";
export const PLAY = "player/PLAY";
export const PLAY_STARTED = "player/PLAY_STARTED";
export const SEEK = "player/SEEK";
export const SEEK_DONE = "player/SEEK_DONE";
export const STOP = "player/STOP";
export const STOPPED = "player/STOPPED";
export const UPDATE_SONG = "player/UPDATE_SONG";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Couldn't get buffer from store.
 */
export function bufferNotFound(bufferId: string): Action {
  return {
    type: BUFFER_NOT_FOUND,
    payload: bufferId
  };
}

/**
 * Notify that the playing has stopped.
 */
export function endPlaying(): Action {
  return { type: END_PLAYING };
}

/**
 * Start playing the current song.
 */
export function play(bufferId: string): Action {
  return {
    type: PLAY,
    payload: bufferId
  };
}

/**
 * Playing has been requested and it should start soon.
 */
export function playStarted(bufferId: string): Action {
  return {
    type: PLAY_STARTED,
    payload: bufferId
  };
}

/**
 * Request the player to seek the current playing buffer
 * to a specified time.
 *
 * @param time Time to seek to.
 */
export function seek(time: number): Action {
  return {
    type: SEEK,
    payload: time
  };
}

/**
 * Notify that the seek has been done.
 */
export function seekDone(): Action {
  return { type: SEEK_DONE };
}

/**
 * Stop the player service and delete the loaded buffer.
 */
export function stop(): Action {
  return { type: STOP };
}

/**
 * Stop the player service and delete the loaded buffer.
 */
export function stopped(): Action {
  return { type: STOPPED };
}

/**
 * Update the current's song info.
 *
 * @param song Updated song info.
 */
export function updateSong(song: CurrentSong): Action {
  return {
    type: UPDATE_SONG,
    payload: song
  };
}
