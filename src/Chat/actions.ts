import { User, Message, Action } from "../types";

import { messagesService } from "../services/messages";

export const UPDATE_INPUT = "chat/UPDATE_INPUT";
export const UPDATE_ONLINE_USERS = "chat/UPDATE_ONLINE_USERS";
export const ADD_MESSAGE = "chat/ADD_MESSAGE";
export const TOGGLE_CHAT = "chat/TOGGLE_CHAT";
export const POST_MESSAGE = "chat/POST_MESSAGE";

export function updateInput(value: string): Action {
  return {
    type: UPDATE_INPUT,
    payload: value
  };
}

export function updateOnlineUsers(users: Array<User>): Action {
  return {
    type: UPDATE_ONLINE_USERS,
    payload: users
  };
}

export function addMessage(message: Message): Action {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}

export function toggleChat(): Action {
  return { type: TOGGLE_CHAT };
}

export function postMessage(message: string): Action {
  messagesService.postMessage(message);

  return { type: POST_MESSAGE };
}
