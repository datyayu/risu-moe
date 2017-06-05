import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ChatState, chatReducer } from "./modules/Chat";
import { PlaylistState, playlistReducer } from "./modules/Playlist";

// reducer type
export interface AppState {
  chat: ChatState;
  playlist: PlaylistState;
}

const windowGlobal = <any>window;

// Setup reducers
const reducer = combineReducers({
  chat: chatReducer,
  playlist: playlistReducer
});

// Setup middleware
const composeEnhancers =
  (windowGlobal && windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* RESERVED FOR FUTURE ENHANCERS */
const storeEnhancers = composeEnhancers(applyMiddleware());

export const store = createStore(reducer, storeEnhancers);
