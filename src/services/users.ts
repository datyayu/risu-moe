import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs";
import { User, Database, DataSnapshot } from "../types";
import { firebaseService } from "./_firebase";

/*******************
 *     SERVICE     *
 *******************/

class UsersService {
  database: Database;
  usersSnapshot$: Observable<DataSnapshot>;

  constructor() {
    this.database = firebaseService.database();

    const presenceRef = this.database.ref("presence") as EventTargetLike;

    this.usersSnapshot$ = Rx.Observable.fromEvent(presenceRef, "value");
  }

  /*******************
   * LOCAL HANDLERS  *
   *******************/

  /**
   * Get the local user from local storage, if it exists.
   */
  getLocalUser(): User | undefined {
    const nickname = localStorage.getItem("chat-nickname");
    const color = localStorage.getItem("chat-color") || "fff";
    const userId = this.getUserId();

    if (!nickname || !userId) {
      return undefined;
    }

    return {
      name: nickname,
      color: color,
      id: userId
    };
  }

  /**
   * Store the user's info in local storage.
   *
   * @param user User info to store
   */
  saveLocalUser(user: User): void {
    localStorage.setItem("chat-nickname", user.name);
    localStorage.setItem("chat-color", user.color);
  }

  /**
   * Get the user id from localstorage. If it doesn't
   * exists in localstorage, request a new one from
   * remote source.
   */
  getUserId(): string | undefined {
    // Try local storage
    const localId = localStorage.getItem("firebase-user-id");
    if (localId) {
      return localId;
    }

    // Try remote
    const remoteId = this.database.ref("presence").push().key;
    if (!remoteId) {
      return undefined;
    }

    // If got from remote, then save in local storage as well.
    localStorage.setItem("firebase-user-id", remoteId);

    return remoteId;
  }

  /*******************
   * REMOTE HANDLERS *
   *******************/

  /**
   * Update the user in database and then store that
   * updated user on local storage.
   *
   * @param user User updated info.
   */
  setUser(user: User): void {
    const userId = this.getUserId();
    if (!userId) return;

    const userRef = this.database.ref("presence/" + userId);
    user.id = userId;

    userRef.set(user).then(() => {
      this.saveLocalUser(user);
    });
  }

  /**
   * Connect the user and set it as online in the
   * remote database. Then return the user's info.
   */
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

// Export it as a singleton.
export const usersService = new UsersService();
