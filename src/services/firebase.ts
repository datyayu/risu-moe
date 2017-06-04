import { storage, database, initializeApp, app } from "firebase";
import { config } from "../config/firebase";

class FirebaseService {
  _database: database.Database;
  _storage: storage.Storage;
  _app: app.App;

  constructor() {
    this._app = initializeApp(config);
    this._database = database();
    this._storage = storage();
  }

  app(): app.App {
    return this._app;
  }

  storage(): storage.Storage {
    return this._storage;
  }

  database(): database.Database {
    return this._database;
  }
}

export const firebaseService = new FirebaseService();
