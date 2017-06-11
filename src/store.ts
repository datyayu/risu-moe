import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import * as Chat from "./modules/Chat";
import * as Playlist from "./modules/Playlist";
import * as NickModal from "./modules/NickModal";
import { PlayerState, playerReducer } from "./modules/Player";
import {
  UploadFileOverlayState,
  uploadFileOverlayReducer
} from "./modules/UploadFileOverlay";
import * as SharedActions from "./shared-actions";

// Store State type
export interface AppState {
  chat: Chat.State;
  nickModal: NickModal.State;
  player: PlayerState;
  playlist: Playlist.State;
  uploadFileOverlay: UploadFileOverlayState;
}

const windowGlobal = <any>window;

// Setup epics
const rootEpic = combineEpics(
  ...Chat.epics,
  ...NickModal.epics,
  ...Playlist.epics
);
const epicMiddleware = createEpicMiddleware(rootEpic);

// Setup reducers
const reducer = combineReducers({
  chat: Chat.reducer,
  nickModal: NickModal.reducer,
  player: playerReducer,
  playlist: Playlist.reducer,
  uploadFileOverlay: uploadFileOverlayReducer
});

// Setup middleware
const composeEnhancers =
  (windowGlobal && windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* RESERVED FOR FUTURE ENHANCERS */
const storeEnhancers = composeEnhancers(applyMiddleware(epicMiddleware));

export const store = createStore(reducer, storeEnhancers);
store.dispatch(SharedActions.init());
