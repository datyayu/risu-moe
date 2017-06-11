import { User, Action } from "../../types";
import * as actions from "./actions";

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

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case actions.SUBMIT:
      return {
        ...state,
        nickname: state.nickInput,
        color: state.colorInput,
        active: false
      };

    case actions.CANCEL:
      return {
        ...state,
        nickInput: state.nickname,
        colorInput: state.color,
        active: false
      };

    case actions.UPDATE_NICK_INPUT:
      return {
        ...state,
        nickInput: action.payload.slice(0, 10)
      };

    case actions.UPDATE_COLOR_INPUT:
      return {
        ...state,
        colorInput: action.payload.slice(0, 6)
      };

    case actions.TOGGLE_MODAL:
      return {
        ...state,
        active: !state.active
      };

    case actions.SET_USER:
      const user: User = action.payload;

      return {
        nickname: user.name,
        nickInput: user.name,
        color: user.color,
        colorInput: user.color,
        active: false
      };

    default:
      return state;
  }
}
