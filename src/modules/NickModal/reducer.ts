import { User, Action } from "../../types";
import * as actions from "./actions";

/*******************
 *      STATE      *
 *******************/

export type State = {
  nickname: string;
  nickInput: string;
  color: string;
  colorInput: string;
  active: boolean;
};

const initialState: State = {
  nickname: "anon",
  nickInput: "",
  color: "cccccc",
  colorInput: "",
  active: true
};

/*******************
 *     REDUCER     *
 *******************/

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    // Update user on submit.
    case actions.SUBMIT:
      return {
        ...state,
        nickname: state.nickInput,
        color: state.colorInput,
        active: false
      };

    // Clear inputs on cancel.
    case actions.CANCEL:
      return {
        ...state,
        nickInput: state.nickname,
        colorInput: state.color,
        active: false
      };

    // Update the nick input value.
    case actions.UPDATE_NICK_INPUT:
      return {
        ...state,
        nickInput: action.payload.slice(0, 10)
      };

    // Update the color input value.
    case actions.UPDATE_COLOR_INPUT:
      return {
        ...state,
        colorInput: action.payload.slice(0, 6)
      };

    // Toggle modal visibility.
    case actions.TOGGLE_MODAL:
      return {
        ...state,
        active: !state.active
      };

    // Load a user from memory into state.
    case actions.SET_USER:
      const user: User = action.payload;

      return {
        nickname: user.name,
        nickInput: user.name,
        color: user.color,
        colorInput: user.color,
        active: false
      };

    // Default.
    default:
      return state;
  }
}
