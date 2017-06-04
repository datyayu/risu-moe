import { User, Message, Action } from "../types";
import * as actions from "./actions";

export type ChatState = {
  messages: Array<Message>;
  user?: User;
  onlineUsers: Array<User>;
  input: string;
  minimized: boolean;
};

const initialState: ChatState = {
  messages: [],
  user: undefined,
  onlineUsers: [],
  input: "hello",
  minimized: false
};

export function chatReducer(
  state: ChatState = initialState,
  action: Action
): ChatState {
  switch (action.type) {
    case actions.UPDATE_INPUT:
      return {
        ...state,
        input: action.payload
      };

    case actions.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case actions.TOGGLE_CHAT:
      return {
        ...state,
        minimized: !state.minimized
      };

    case actions.UPDATE_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };

    case actions.POST_MESSAGE:
      return {
        ...state,
        input: ""
      };

    default:
      return state;
  }
}
