import { AppState } from "../../store";

export function getNickInput(state: AppState): string {
  return state.nickModal.nickInput;
}

export function getColorInput(state: AppState): string {
  return state.nickModal.colorInput;
}

export function isModalActive(state: AppState): boolean {
  return state.nickModal.active;
}

export function colorIsValid(state: AppState): boolean {
  const color = state.nickModal.colorInput;
  const hexColorRegex = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;

  return hexColorRegex.test(color);
}

export function nameIsValid(state: AppState): boolean {
  const name = state.nickModal.nickInput;
  const validationRegex = /^[0-9a-z]+$/i;

  return validationRegex.test(name);
}

export function areInputsValid(state: AppState): boolean {
  const color = colorIsValid(state);
  const name = nameIsValid(state);

  return color && name;
}
