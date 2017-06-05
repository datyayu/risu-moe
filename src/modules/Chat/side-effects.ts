import { database as fbdb } from "firebase";
import { User, Message } from "../../types";
import { store } from "../../store";
import { messagesService, usersService } from "../../services";
import * as actions from "./actions";

export function init() {
  messagesService.addMessagesListener(function(snapshot: fbdb.DataSnapshot) {
    const message: Message = snapshot.val();
    if (!message) return;

    const action = actions.addMessage(message);
    store.dispatch(action);
  });

  usersService.addConnectionListener(function(users: Array<User>) {
    if (!users) return;

    const action = actions.updateOnlineUsers(users);
    store.dispatch(action);
  });
}
