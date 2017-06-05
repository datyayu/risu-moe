import { AppState } from "../../store";
import { Message, User } from "../../types";

export function getMessages(state: AppState): Array<Message> {
  return state.chat.messages;
}

export function getUserInfo(state: AppState): User | undefined {
  return state.chat.user;
}

export function getChatInputValue(state: AppState): string {
  return state.chat.input;
}

export function getOnlineUsers(state: AppState): Array<User> {
  return state.chat.onlineUsers;
}

export function isChatMinimized(state: AppState): boolean {
  return state.chat.minimized;
}
