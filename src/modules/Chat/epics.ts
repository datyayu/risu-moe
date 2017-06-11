import { Observable } from "rxjs/Observable";
import { Action, Message, ActionObservable, DataSnapshot } from "../../types";
import { messagesService, usersService } from "../../services";
import { actions as SharedActions } from "../../shared";
import * as actions from "./actions";

/*******************
 *      EPICS      *
 *******************/

/**
 * On new messages, add that message to the chat.
 */
const addNewMessages$ = (action$: ActionObservable): Observable<Action> =>
  messagesService.messagesSnapshot$.map(function(snapshot: DataSnapshot) {
    const message: Message = snapshot.val();
    if (!message) return SharedActions.nullAction();

    return actions.addMessage(message);
  });

/**
 * On remote online users list update, update the local list
 * as well.
 */
const updateOnlineUsers$ = (action$: ActionObservable): Observable<Action> =>
  usersService.usersSnapshot$.map(function(snapshot: DataSnapshot) {
    var db = snapshot.val();
    if (!db) return SharedActions.nullAction();

    var users = Object.keys(db).map(function(key: string) {
      return db[key];
    });

    if (!users) return SharedActions.nullAction();

    return actions.updateOnlineUsers(users);
  });

/**
 * When chat/POST_MESSAGE action is dispatched, post the
 * message to the messages database.
 */
export const postMessage$ = (action$: ActionObservable): Observable<Action> =>
  action$.ofType(actions.POST_MESSAGE).map(action => {
    messagesService.postMessage(action.payload);

    return SharedActions.nullAction();
  });

// Export all epics
export const epics = [addNewMessages$, updateOnlineUsers$, postMessage$];
