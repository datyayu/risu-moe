import { AppState, Message, User } from "../../types";

/**
 * Get the current value for the chat text input.
 */
export function getChatInputValue(state: AppState): string {
  return state.chat.input;
}

/**
 * Get all messages in chat.
 */
export function getMessages(state: AppState): Array<Message> {
  return state.chat.messages;
}

/**
 * Get the list of currently online users.
 */
export function getOnlineUsers(state: AppState): Array<User> {
  return state.chat.onlineUsers;
}

/**
 * Get the current user info if the user exists.
 */
export function getUserInfo(state: AppState): User | undefined {
  return state.chat.user;
}

/**
 * Check wheter the chat is visible or not.
 */
export function isChatMinimized(state: AppState): boolean {
  return state.chat.minimized;
}
