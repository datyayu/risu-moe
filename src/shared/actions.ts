import { Action } from "../types";

/*******************
 *  ACTION TYPES   *
 *******************/

export const INIT = "app/INIT";
export const NULL = "app/NULL";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Dispatch this action when the app is initialized.
 */
export function init(): Action {
  return { type: INIT };
}

/**
 * Null action.
 * Used as a temporary workaround to cancel epics.
 *
 * @todo Replace it for module-local error-handling actions.
 */
export function nullAction(): Action {
  return { type: NULL };
}
