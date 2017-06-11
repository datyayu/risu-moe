import { User, Message, Action } from "../../types";

import * as actions from "./actions";

/*******************
 *      STATE      *
 *******************/

export type State = {
  messages: Array<Message>;
  user?: User;
  onlineUsers: Array<User>;
  input: string;
  minimized: boolean;
};

const initialState: State = {
  messages: [],
  user: undefined,
  onlineUsers: [],
  input: "",
  minimized: false
};

/*******************
 *     REDUCER     *
 *******************/

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    // Update chat input
    case actions.UPDATE_INPUT:
      return {
        ...state,
        input: action.payload
      };

    // Add message to chat box.
    case actions.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    // Toggle chat visibility.
    case actions.TOGGLE_CHAT:
      return {
        ...state,
        minimized: !state.minimized
      };

    // Update online users list.
    case actions.UPDATE_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };

    // Post message to database.
    case actions.POST_MESSAGE:
      return {
        ...state,
        input: ""
      };

    // Default
    default:
      return state;
  }
}
