import * as React from "react";
import { Message } from "../../types";
import { ChatMessageContent } from "./ChatMessageContent";
import "./ChatMessage.css";

function parseTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  // TODO: Padding
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  return `[${hour}:${minutes}:${seconds}]`;
}

interface ChatMessageProps {
  message: Message;
}

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
