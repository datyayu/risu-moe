import { Action } from "./types";

export const INIT = "app/INIT";
export const NULL = "app/NULL";

export function init(): Action {
  return { type: INIT };
}

export function nullAction(): Action {
  return { type: NULL };
}
