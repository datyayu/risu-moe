import { Observable } from "rxjs/Observable";
import { Action, Message, ActionObservable, User } from "../../types";
import { messagesService, usersService } from "../../services";
import * as actions from "./actions";

/*******************
 *      EPICS      *
 *******************/

/**
 * On new messages, add that message to the chat.
 */
const addNewMessages$ = (action$: ActionObservable): Observable<Action> =>
  messagesService.messages$.map(function(message: Message | undefined) {
    if (!message) {
      return actions.errorAddingMesage();
    }

    return actions.addMessage(message);
  });

/**
 * On remote online users list update, update the local list
 * as well.
 */
const updateOnlineUsers$ = (action$: ActionObservable): Observable<Action> =>
  usersService.users$.map(function(users: Array<User>) {
    if (!users) {
      return actions.errorUpdatingOnlineUsers();
    }

    return actions.updateOnlineUsers(users);
  });

/**
 * When chat/POST_MESSAGE action is dispatched, post the
 * message to the messages database.
 */
export const postMessage$ = (action$: ActionObservable): Observable<Action> =>
  action$.ofType(actions.POST_MESSAGE).map(action => {
    messagesService.postMessage(action.payload);

    return actions.messagePosted();
  });

// Export all epics
export const epics = [addNewMessages$, updateOnlineUsers$, postMessage$];
