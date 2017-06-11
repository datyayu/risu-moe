import { User, Message, Action } from "../../types";

/*******************
 *  ACTION TYPES   *
 *******************/

export const ADD_MESSAGE = "chat/ADD_MESSAGE";
export const POST_MESSAGE = "chat/POST_MESSAGE";
export const TOGGLE_CHAT = "chat/TOGGLE_CHAT";
export const UPDATE_INPUT = "chat/UPDATE_INPUT";
export const UPDATE_ONLINE_USERS = "chat/UPDATE_ONLINE_USERS";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Add a message to the chat.
 *
 * @param message Message to add.
 */
export function addMessage(message: Message): Action {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}

/**
 * Post a message to the db.
 *
 * @param message Message to post.
 */
export function postMessage(message: string): Action {
  return {
    type: POST_MESSAGE,
    payload: message
  };
}

/**
 * Toogles chat visibility.
 */
export function toggleChat(): Action {
  return { type: TOGGLE_CHAT };
}

/**
 * Updates the chat input value with a given value.
 *
 * @param value New input value.
 */
export function updateInput(value: string): Action {
  return {
    type: UPDATE_INPUT,
    payload: value
  };
}

/**
 * Update the list of online users on the chat.
 *
 * @param users List of online users.
 */
export function updateOnlineUsers(users: Array<User>): Action {
  return {
    type: UPDATE_ONLINE_USERS,
    payload: users
  };
}
