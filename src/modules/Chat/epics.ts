import { Observable } from "rxjs/Observable";
import { ActionsObservable } from "redux-observable";
import { database as fbdb } from "firebase";
import { Action, Message } from "../../types";
import { messagesService, usersService } from "../../services";
import * as actions from "./actions";
import * as SharedActions from "../../shared-actions";

const addNewMessages$ = (
  action$: ActionsObservable<Action>
): Observable<Action> =>
  messagesService.messagesSnapshot$.map(function(snapshot: fbdb.DataSnapshot) {
    const message: Message = snapshot.val();
    if (!message) return SharedActions.nullAction();

    return actions.addMessage(message);
  });

const updateOnlineUsers$ = function(
  action$: ActionsObservable<Action>
): Observable<Action> {
  return usersService.usersSnapshot$.map(function(snapshot: fbdb.DataSnapshot) {
    var db = snapshot.val();
    if (!db) return SharedActions.nullAction();

    var users = Object.keys(db).map(function(key: string) {
      return db[key];
    });

    if (!users) return SharedActions.nullAction();

    return actions.updateOnlineUsers(users);
  });
};

export const postMessage$ = (
  action$: ActionsObservable<Action>,
  store: {}
): Observable<Action> =>
  action$.ofType(actions.POST_MESSAGE).map(action => {
    messagesService.postMessage(action.payload);

    return SharedActions.nullAction();
  });

export const epics = [addNewMessages$, updateOnlineUsers$, postMessage$];
