import * as React from "react";
import { parseUserId } from "../../../utils";
import "./ChatOnlineUser.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatOnlineUserProps {
  name: string;
  color: string;
  id: string;
}

/*******************
 *    COMPONENT    *
 *******************/

export const ChatOnlineUser = ({ name, color, id }: ChatOnlineUserProps) =>
  <li className="chat-online-user" style={{ color: `#${color}` }}>
    {name}#{parseUserId(id)}
  </li>;
