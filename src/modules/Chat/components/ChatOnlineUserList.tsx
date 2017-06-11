import * as React from "react";
import { connect } from "react-redux";
import { User, AppState } from "../../../types";
import * as Selectors from "../selectors";
import { ChatOnlineUser } from "./ChatOnlineUser";
import "./ChatOnlineUserList.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatOnlineUserListProps {
  users: Array<User>;
}

/*******************
 *    COMPONENT    *
 *******************/

const ChatOnlineUserListComponent = ({ users }: ChatOnlineUserListProps) =>
  <div className="chat-online">
    <h3 className="chat-online-title"> Online </h3>
    <ul className="chat-online-users">
      {users.map((user, index) =>
        <ChatOnlineUser
          key={index}
          name={user.name}
          color={user.color}
          id={user.id}
        />
      )}
    </ul>
  </div>;

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState) {
  const onlineUsers = Selectors.getOnlineUsers(state);

  return { users: onlineUsers };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const ChatOnlineUserList: React.ComponentClass<{}> = connect(
  mapStateToProps
)(ChatOnlineUserListComponent);
