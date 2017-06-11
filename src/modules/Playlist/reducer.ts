import { Song, Action } from "../../types";
import * as actions from "./actions";

/*******************
 *      UTILS      *
 *******************/

type SongBuffer = {
  id: string;
  buffer: ArrayBuffer;
};

/*******************
 *      STATE      *
 *******************/

export type State = {
  songs: Array<Song>;
  minimized: boolean;
  buffers: {
    [id: string]: ArrayBuffer;
  };
};

const initialState: State = {
  songs: [],
  minimized: false,
  buffers: {}
};

/*******************
 *     REDUCER     *
 *******************/

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    // Store a song buffer.
    case actions.SET_SONG_BUFFER:
      const songBuffer = action.payload as SongBuffer;
      const id = songBuffer.id;

      return {
        ...state,
        buffers: {
          ...state.buffers,
          [id]: songBuffer.buffer
        }
      };

    // Update the song list and remove buffers
    // that aren't in the playlist anymore.
    case actions.SET_PLAYLIST:
      const newSongs = action.payload as Array<Song>;
      const filterBufferList = () => {
        const newBufferList = {};
        const newSongsIds = newSongs.map(song => song.id);

        for (let key in state.buffers) {
          if (key && newSongsIds.some(songId => songId === key)) {
            newBufferList[key] = state.buffers[key];
          }
        }

        return newBufferList;
      };

      return {
        ...state,
        songs: newSongs,
        buffers: filterBufferList()
      };

    // Toggle playlist visibility.
    case actions.TOGGLE_PLAYLIST:
      return {
        ...state,
        minimized: !state.minimized
      };

    // Default.
    default:
      return state;
  }
}
