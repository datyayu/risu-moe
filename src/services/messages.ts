import { database as fbdb } from "firebase";
import { firebaseService } from "./firebase";
import { usersService } from "./users";

type MessageListenerCallback = (a: fbdb.DataSnapshot) => void;

class MessagesService {
  database: fbdb.Database;

  constructor() {
    this.database = firebaseService.database();
  }

  addMessagesListener(handler: MessageListenerCallback): void {
    this.database
      .ref("messages")
      .orderByChild("updated")
      .equalTo(true)
      .limitToLast(10)
      .on("child_added", handler);
  }

  postMessage(text: string): void {
    const msgRef = this.database.ref("messages").push();

    msgRef.set({
      text: text,
      type_: "user",
      user: usersService.getLocalUser()
    });
  }
}

export const messagesService = new MessagesService();
