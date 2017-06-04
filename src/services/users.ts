import { database } from "firebase";
import { User } from "../types";
import { firebaseService } from "./firebase";

class UsersService {
  database: database.Database;

  constructor() {
    this.database = firebaseService.database();
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

  addConnectionListener(handler: Function): void {
    this.database
      .ref("presence")
      .on("value", function(snapshot: database.DataSnapshot) {
        var db = snapshot.val();
        if (!db) return;

        var users = Object.keys(db).map(function(key: string) {
          return db[key];
        });

        handler(users);
      });
  }

  setUser(user: User): void {
    const userId = this.getUserId();
    const userRef = this.database.ref("presence/" + userId);

    if (!userId) return;

    user.id = userId;

    userRef.set(user).then(() => {
      this.saveLocalUser(user);
    });
  }

  connect(): void {
    const userId = this.getUserId();
    const localUser = this.getLocalUser();
    const userRef = this.database.ref("presence/" + userId);

    if (localUser && userId) {
      localUser.id = userId;
      userRef.set(localUser);
    }

    userRef.onDisconnect().remove();
  }
}

export const usersService = new UsersService();
