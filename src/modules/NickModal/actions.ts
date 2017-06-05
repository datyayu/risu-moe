import { User, Action } from "../../types";
import { usersService } from "../../services";
import * as Selectors from "./selectors";
import { store } from "../../store";

export const SUBMIT = "nickModal/SUBMIT";
export const CANCEL = "nickModal/CANCEL";
export const UPDATE_NICK_INPUT = "nickModal/UPDATE_NICK_INPUT";
export const UPDATE_COLOR_INPUT = "nickModal/UPDATE_COLOR_INPUT";
export const TOGGLE_MODAL = "nickModal/TOGGLE_MODAL";
export const SET_USER = "nickModal/SET_USER";

export function submit(): Action {
  const currentState = store.getState();
  const inputsAreValid = Selectors.areInputsValid(currentState);
  const userId = usersService.getUserId();

  // Make sure data is valid
  if (!userId || !inputsAreValid) {
    return { type: "@@NULL" };
  }

  const user: User = {
    id: userId,
    name: Selectors.getNickInput(currentState),
    color: Selectors.getColorInput(currentState)
  };

  // Update firebase ref.
  usersService.setUser(user);

  // Dispatch action
  return { type: SUBMIT };
}

export function cancel(): Action {
  return { type: CANCEL };
}

export function updateNickInput(value: string): Action {
  return {
    type: UPDATE_NICK_INPUT,
    payload: value
  };
}

export function updateColorInput(value: string): Action {
  return {
    type: UPDATE_COLOR_INPUT,
    payload: value
  };
}

export function toggleModal(): Action {
  return { type: TOGGLE_MODAL };
}

export function setUser(user: User): Action {
  return {
    type: SET_USER,
    payload: user
  };
}
