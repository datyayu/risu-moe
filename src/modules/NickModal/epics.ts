import { Observable } from "rxjs/Observable";
import { Action, ActionObservable, AppStore, User } from "../../types";
import { usersService } from "../../services";
import * as actions from "./actions";
import { actions as SharedActions } from "../../shared";
import * as Selectors from "./selectors";

/*******************
 *      EPICS      *
 *******************/

/**
 * When the application is initialized, log in the user.
 */
const connectUser$ = (action$: ActionObservable): Observable<Action> =>
  action$.ofType(SharedActions.INIT).map(function() {
    const user = usersService.connect();

    if (!user) {
      return SharedActions.nullAction();
    }

    return actions.setUser(user);
  });

/**
 * When the user submit's the modal info, update the local
 * and remote user references.
 */
const postUser$ = (
  action$: ActionObservable,
  store: AppStore
): Observable<Action> =>
  action$.ofType(actions.SUBMIT).map(function() {
    const userId = usersService.getUserId();
    const state = store.getState();

    if (!userId) {
      return actions.cancel();
    }

    const user: User = {
      id: userId,
      name: Selectors.getNickInput(state),
      color: Selectors.getColorInput(state)
    };

    // Update firebase ref.
    usersService.setUser(user);

    return SharedActions.nullAction();
  });

// Export all epics.
export const epics = [connectUser$, postUser$];
