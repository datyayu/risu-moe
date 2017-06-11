import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs";
import { database as fbdb } from "firebase";
import { firebaseService } from "./firebase";
import { usersService } from "./users";

class MessagesService {
  database: fbdb.Database;
  messagesSnapshot$: Observable<fbdb.DataSnapshot>;

  constructor() {
    this.database = firebaseService.database();
    const msgsRef = this.database
      .ref("messages")
      .orderByChild("updated")
      .equalTo(true)
      .limitToLast(10) as EventTargetLike;

    this.messagesSnapshot$ = Rx.Observable.fromEvent(msgsRef, "child_added");
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
