import { init as initSideEffects } from "./side-effects";

export * from "./reducer";
export * from "./actions";
export { Chat as ChatComponent } from "./components";

initSideEffects();
