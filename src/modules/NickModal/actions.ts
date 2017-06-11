import { User, Action } from "../../types";
import { store } from "../../store";
import { usersService } from "../../services";
import * as Selectors from "./selectors";

/*******************
 *  ACTION TYPES   *
 *******************/

export const CANCEL = "nickModal/CANCEL";
export const SET_USER = "nickModal/SET_USER";
export const SUBMIT = "nickModal/SUBMIT";
export const TOGGLE_MODAL = "nickModal/TOGGLE_MODAL";
export const UPDATE_COLOR_INPUT = "nickModal/UPDATE_COLOR_INPUT";
export const UPDATE_NICK_INPUT = "nickModal/UPDATE_NICK_INPUT";
export const USER_UPDATED = "nickModal/USER_UPDATED";

/*******************
 * ACTION CREATORS *
 *******************/

/**
 * Cancel the current values and close the modal.
 */
export function cancel(): Action {
  return { type: CANCEL };
}

/**
 * Update the current user's info.
 *
 * @param user User's info.
 */
export function setUser(user: User): Action {
  return {
    type: SET_USER,
    payload: user
  };
}

/**
 * Submit and save the current modal values.
 */
export function submit(): Action {
  const currentState = store.getState();
  const inputsAreValid = Selectors.areInputsValid(currentState);
  const userId = usersService.getUserId();

  // Make sure data is valid
  if (!userId || !inputsAreValid) {
    return cancel();
  }

  return { type: SUBMIT };
}

/**
 * Toggle the moddal visibility.
 */
export function toggleModal(): Action {
  return { type: TOGGLE_MODAL };
}

/**
 * Update the color text input value.
 *
 * @param value New color value.
 */
export function updateColorInput(value: string): Action {
  return {
    type: UPDATE_COLOR_INPUT,
    payload: value
  };
}

/**
 * Update the nick input value.
 *
 * @param value New nick value.
 */
export function updateNickInput(value: string): Action {
  return {
    type: UPDATE_NICK_INPUT,
    payload: value
  };
}

/**
 * Notify that the current user has been updated.
 */
export function userUpdated(): Action {
  return { type: USER_UPDATED };
}
