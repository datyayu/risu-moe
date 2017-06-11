import * as React from "react";
import { Message } from "../../../types";
import { parseTimestamp } from "../../../utils";
import { ChatMessageContent } from "./ChatMessageContent";
import "./ChatMessage.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatMessageProps {
  message: Message;
}

/*******************
 *    COMPONENT    *
 *******************/

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const time: string = parseTimestamp(message.time);

  return (
    <div className="chat-message">
      <span className="chat-message-time">{time}</span>

      <ChatMessageContent
        text={message.text}
        username={message.user.name}
        color={message.user.color}
        messageType={message.type_}
        userId={message.user.id}
      />
    </div>
  );
};
