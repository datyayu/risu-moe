import * as React from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import "./ChatContent.css";

export const ChatContent = () =>
  <div className="chat-content">
    <ChatBox />
    <ChatInput />
  </div>;
