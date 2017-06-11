import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { Observable } from "rxjs/Observable";
import { DataSnapshot, Database } from "../types";
import { firebaseService } from "./_firebase";
import { usersService } from "./users";

/*******************
 *     SERVICE     *
 *******************/

class MessagesService {
  database: Database;
  messagesSnapshot$: Observable<DataSnapshot>;

  constructor() {
    this.database = firebaseService.database();

    const msgsRef = this.database
      .ref("messages")
      .orderByChild("updated")
      .equalTo(true)
      .limitToLast(10) as EventTargetLike;

    // Convert the message ref to an observable.
    this.messagesSnapshot$ = Observable.fromEvent(msgsRef, "child_added");
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
