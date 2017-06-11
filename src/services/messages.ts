import { Subject } from "rxjs/Subject";
import { DataSnapshot, Database, Message } from "../types";
import { firebaseService } from "./_firebase";
import { usersService } from "./users";

/*******************
 *     SERVICE     *
 *******************/

class MessagesService {
  database: Database;
  messages$: Subject<Message>;

  constructor() {
    this.database = firebaseService.database();
    this.messages$ = new Subject();

    const msgsRef = this.database
      .ref("messages")
      .orderByChild("updated")
      .equalTo(true)
      .limitToLast(10);

    this.handleMessageAdded = this.handleMessageAdded.bind(this);

    // Convert the message ref to an observable.
    msgsRef.on("child_added", this.handleMessageAdded);
  }

  handleMessageAdded(snapshot: DataSnapshot) {
    const message: Message = snapshot.val();

    if (!message) {
      return this.messages$.next();
    }

    this.messages$.next(message);
  }

  /**
   * Post a message to the firebase real-time-db.
   *
   * @param text Message's text content.
   */
  postMessage(text: string): void {
    const msgRef = this.database.ref("messages").push();

    msgRef.set({
      text: text,
      type_: "user",
      user: usersService.getLocalUser()
    });
  }
}

// Export it as a singleton.
export const messagesService = new MessagesService();
