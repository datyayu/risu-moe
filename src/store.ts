import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import * as Chat from "./modules/Chat";
import * as Playlist from "./modules/Playlist";
import * as NickModal from "./modules/NickModal";
import * as UploadFileOverlay from "./modules/UploadFileOverlay";
import * as Player from "./modules/Player";
import { actions } from "./shared";

/*******************
 *      UTILS      *
 *******************/

const windowGlobal = <any>window;

/*******************
 *      STATE      *
 *******************/

export interface AppState {
  chat: Chat.State;
  nickModal: NickModal.State;
  player: Player.State;
  playlist: Playlist.State;
  uploadFileOverlay: UploadFileOverlay.State;
}

/*******************
 *      EPICS      *
 *******************/

const rootEpic = combineEpics(
  ...Chat.epics,
  ...NickModal.epics,
  ...Player.epics,
  ...Playlist.epics,
  ...UploadFileOverlay.epics
);
const epicMiddleware = createEpicMiddleware(rootEpic);

/*******************
 *  MAIN REDUCER   *
 *******************/

const reducer = combineReducers({
  chat: Chat.reducer,
  nickModal: NickModal.reducer,
  player: Player.reducer,
  playlist: Playlist.reducer,
  uploadFileOverlay: UploadFileOverlay.reducer
});

/*******************
 *    ENHANCERS    *
 *******************/

const composeEnhancers =
  (windowGlobal && windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const storeEnhancers = composeEnhancers(
  applyMiddleware(
    epicMiddleware
    /* RESERVED FOR FUTURE MIDDLEWARE */
  )
);

/*******************
 *      STORE      *
 *******************/

export const store = createStore(reducer, storeEnhancers);

// Dispatch init action.
store.dispatch(actions.init());
