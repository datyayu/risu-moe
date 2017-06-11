import { storage, database, initializeApp, app } from "firebase";
import { config } from "../config/firebase";

/*******************
 *     SERVICE     *
 *******************/

class FirebaseService {
  _database: database.Database;
  _storage: storage.Storage;
  _app: app.App;

  constructor() {
    this._app = initializeApp(config);
    this._database = database();
    this._storage = storage();
  }

  /**
   * Get the firebase app instance.
   */
  app(): app.App {
    return this._app;
  }

  /**
   * Get the firebase storage reference.
   */
  storage(): storage.Storage {
    return this._storage;
  }

  /**
   * Get the firebase database reference.
   */
  database(): database.Database {
    return this._database;
  }
}

// Export it as a singleton.
export const firebaseService = new FirebaseService();
