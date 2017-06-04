import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ChatState, chatReducer } from "./Chat";

// reducer type
export type AppState = {
  chat: ChatState;
};

const windowGlobal = <any>window;

// Setup reducers
const reducer = combineReducers({
  chat: chatReducer
});

// Setup middleware
const composeEnhancers =
  (windowGlobal && windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/* RESERVED FOR FUTURE ENHANCERS */
const storeEnhancers = composeEnhancers(applyMiddleware());

export const store = createStore(reducer, storeEnhancers);
