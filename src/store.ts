import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ChatState, chatReducer } from "./modules/Chat";
import { PlaylistState, playlistReducer } from "./modules/Playlist";
import { PlayerState, playerReducer } from "./modules/Player";

// Store State type
export interface AppState {
  chat: ChatState;
  playlist: PlaylistState;
  player: PlayerState;
}

const windowGlobal = <any>window;

// Setup reducers
const reducer = combineReducers({
  chat: chatReducer,
  playlist: playlistReducer,
  player: playerReducer
});

// Setup middleware
const composeEnhancers =
  (windowGlobal && windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* RESERVED FOR FUTURE ENHANCERS */
const storeEnhancers = composeEnhancers(applyMiddleware());

export const store = createStore(reducer, storeEnhancers);
