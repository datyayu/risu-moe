import { database } from "firebase";
import { User } from "../types";
import { firebaseService } from "./firebase";
import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs";
import { EventTargetLike } from "rxjs/observable/FromEventObservable";

class UsersService {
  database: database.Database;
  usersSnapshot$: Observable<database.DataSnapshot>;

  constructor() {
    this.database = firebaseService.database();

    const presenceRef = this.database.ref("presence") as EventTargetLike;

    this.usersSnapshot$ = Rx.Observable.fromEvent(presenceRef, "value");
  }

  getLocalUser(): User | undefined {
    const nickname = localStorage.getItem("chat-nickname");
    const color = localStorage.getItem("chat-color") || "fff";
    const userId = this.getUserId();

    if (!nickname || !userId) return undefined;

    return {
      name: nickname,
      color: color,
      id: userId
    };
  }

  saveLocalUser(user: User): void {
    localStorage.setItem("chat-nickname", user.name);
    localStorage.setItem("chat-color", user.color);
  }

  getUserId(): string | undefined {
    const localId = localStorage.getItem("firebase-user-id");

    if (localId) {
      return localId;
    }

    const remoteId = this.database.ref("presence").push().key;

    if (!remoteId) return undefined;

    localStorage.setItem("firebase-user-id", remoteId);

    return remoteId;
  }

  setUser(user: User): void {
    const userId = this.getUserId();
    if (!userId) return;

    const userRef = this.database.ref("presence/" + userId);
    user.id = userId;

    userRef.set(user).then(() => {
      this.saveLocalUser(user);
    });
  }

  connect(): User | undefined {
    const userId = this.getUserId();
    const localUser = this.getLocalUser();
    const userRef = this.database.ref("presence/" + userId);

    if (localUser && userId) {
      localUser.id = userId;
      userRef.set(localUser);
    }

    userRef.onDisconnect().remove();

    return localUser;
  }
}

export const usersService = new UsersService();
