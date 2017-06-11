import * as React from "react";
import { parseUserId } from "../../../utils";
import "./ChatMessageContent.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatMessageProps {
  color: string;
  username: string;
  text: string;
  messageType: "user" | "system";
  userId: string;
}

/*******************
 *    COMPONENT    *
 *******************/

export const ChatMessageContent = ({
  color,
  username,
  text,
  messageType,
  userId
}: ChatMessageProps) => {
  const textClass = messageType === "system"
    ? "chat-message-text--system"
    : text.startsWith(">") ? "chat-message-text--green" : "chat-message-text";

  return (
    <div className="chat-message-content">
      <span className="chat-message-user" style={{ color: `#${color}` }}>
        {username && `${username}#${parseUserId(userId)}`}
      </span>
      {" "}
      <span className={textClass}>
        {text}
      </span>
    </div>
  );
};
