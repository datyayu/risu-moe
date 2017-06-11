import { User, Action } from "../../types";
import { store } from "../../store";
import { usersService } from "../../services/users";
import * as Selectors from "./selectors";
import * as SharedActions from "../../shared-actions";

export const SUBMIT = "nickModal/SUBMIT";
export function submit(): Action {
  const currentState = store.getState();
  const inputsAreValid = Selectors.areInputsValid(currentState);
  const userId = usersService.getUserId();

  // Make sure data is valid
  if (!userId || !inputsAreValid) {
    return SharedActions.nullAction();
  }

  // Dispatch action
  return { type: SUBMIT };
}

export const CANCEL = "nickModal/CANCEL";
export function cancel(): Action {
  return { type: CANCEL };
}

export const UPDATE_NICK_INPUT = "nickModal/UPDATE_NICK_INPUT";
export function updateNickInput(value: string): Action {
  return {
    type: UPDATE_NICK_INPUT,
    payload: value
  };
}

export const UPDATE_COLOR_INPUT = "nickModal/UPDATE_COLOR_INPUT";
export function updateColorInput(value: string): Action {
  return {
    type: UPDATE_COLOR_INPUT,
    payload: value
  };
}

export const TOGGLE_MODAL = "nickModal/TOGGLE_MODAL";
export function toggleModal(): Action {
  return { type: TOGGLE_MODAL };
}

export const SET_USER = "nickModal/SET_USER";
export function setUser(user: User): Action {
  return {
    type: SET_USER,
    payload: user
  };
}

export const USER_UPDATED = "nickModal/USER_UPDATED";
export function userUpdated(user: User): Action {
  return { type: USER_UPDATED };
}
