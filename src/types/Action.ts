import { ActionsObservable } from "redux-observable";

export type Action = {
  type: string;
  payload?: any;
};

export type ActionObservable = ActionsObservable<Action>;
