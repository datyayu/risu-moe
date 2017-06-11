import { AppState } from "../../types";

/**
 * Check if the inputs have valid values.
 */
export function areInputsValid(state: AppState): boolean {
  const color = isColorValid(state);
  const nickname = isNicknameValid(state);

  return color && nickname;
}

/**
 * Get the color input value.
 */
export function getColorInput(state: AppState): string {
  return state.nickModal.colorInput;
}

/**
 * Get the nick input value.
 */
export function getNickInput(state: AppState): string {
  return state.nickModal.nickInput;
}

/**
 * Check if the color input has a valid HEX color as
 * value.
 */
export function isColorValid(state: AppState): boolean {
  const color = state.nickModal.colorInput;
  const hexColorRegex = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;

  return hexColorRegex.test(color);
}

/**
 * Check if the modal is active or not.
 */
export function isModalActive(state: AppState): boolean {
  return state.nickModal.active;
}

/**
 * Check if the nickname input isn't empty and
 * contains only alphanumeric characters.
 */
export function isNicknameValid(state: AppState): boolean {
  const name = state.nickModal.nickInput;
  const validationRegex = /^[0-9a-z]+$/i;

  return validationRegex.test(name);
}
