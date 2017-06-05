import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ChatState, chatReducer } from "./modules/Chat";
import { PlaylistState, playlistReducer } from "./modules/Playlist";
import { PlayerState, playerReducer } from "./modules/Player";
import { NickModalState, nickModalReducer } from "./modules/NickModal";

// Store State type
export interface AppState {
  chat: ChatState;
  nickModal: NickModalState;
  player: PlayerState;
  playlist: PlaylistState;
}

const windowGlobal = <any>window;

// Setup reducers
const reducer = combineReducers({
  chat: chatReducer,
  nickModal: nickModalReducer,
  player: playerReducer,
  playlist: playlistReducer
});

// Setup middleware
const composeEnhancers =
  (windowGlobal && windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* RESERVED FOR FUTURE ENHANCERS */
const storeEnhancers = composeEnhancers(applyMiddleware());

export const store = createStore(reducer, storeEnhancers);
