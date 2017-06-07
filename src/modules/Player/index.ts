import { init as initSideEffects } from "./side-effects";

export * from "./reducer";
// export * from "./actions";
export { Player as PlayerComponent } from "./components";

initSideEffects();
