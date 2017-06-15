import { database, initializeApp, app } from "firebase";
import { config } from "../config/firebase";

/*******************
 *     SERVICE     *
 *******************/

class FirebaseService {
  private _database: database.Database;
  private _app: app.App;

  constructor() {
    this._app = initializeApp(config);
    this._database = database();
  }

  /**
   * Get the firebase app instance.
   */
  app(): app.App {
    return this._app;
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
