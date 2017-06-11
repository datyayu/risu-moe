import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs/Observable";
import { Action, User } from "../../types";
import { usersService } from "../../services";
import * as actions from "./actions";
import * as SharedActions from "../../shared-actions";
import * as Selectors from "./selectors";
import { Store } from "redux";
import { AppState } from "../../store";

const connectUser$ = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.ofType(SharedActions.INIT).map(function() {
    const user = usersService.connect();
    if (!user) return SharedActions.nullAction();

    return actions.setUser(user);
  });

const postUser$ = (
  action$: ActionsObservable<Action>,
  store: Store<AppState>
): Observable<Action> =>
  action$.ofType(actions.SUBMIT).map(function() {
    const userId = usersService.getUserId();
    const state = store.getState();

    if (!userId) return actions.cancel();

    const user: User = {
      id: userId,
      name: Selectors.getNickInput(state),
      color: Selectors.getColorInput(state)
    };

    // Update firebase ref.
    usersService.setUser(user);

    return SharedActions.nullAction();
  });

export const epics = [connectUser$, postUser$];
