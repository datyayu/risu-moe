import { usersService } from "../../services";
import { store } from "../../store";
import * as actions from "./actions";

export function init() {
  function connectUser() {
    const user = usersService.connect();
    if (!user) return;

    const action = actions.setUser(user);
    store.dispatch(action);
  }

  // Wait for the store to be initiated.
  setTimeout(connectUser, 200);
}
