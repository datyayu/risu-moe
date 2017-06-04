import * as React from "react";
import "./ChatOnlineUser.css";

interface ChatOnlineUserProps {
  name: string;
  color: string;
}

export const ChatOnlineUser = ({ name, color }: ChatOnlineUserProps) =>
  <li className="chat-online-user" style={{ color: `#${color}` }}>
    {name}
  </li>;
