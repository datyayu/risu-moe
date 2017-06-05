import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import * as Selectors from "../selectors";
import { ChatTitle } from "./ChatTitle";
import { ChatContent } from "./ChatContent";
import { ChatMinimizeButton } from "./ChatMinimizeButton";
import { ChatOnlineUserList } from "./ChatOnlineUserList";
import { ChatSettingsButton } from "./ChatSettingsButton";
import "./Chat.css";

interface ChatProps {
  minimized: boolean;
}

const ChatComponent = ({ minimized }: ChatProps) =>
  <div className={`chat ${minimized ? "chat--min" : ""}`}>
    <ChatMinimizeButton />

    <div className="chat-left">
      <ChatTitle />
      <ChatContent />
    </div>

    <div className="chat-right">
      <ChatOnlineUserList />
      <ChatSettingsButton />
    </div>
  </div>;

function mapStateToProps(state: AppState): ChatProps {
  return { minimized: Selectors.isChatMinimized(state) };
}

export const Chat: React.ComponentClass<{}> = connect(mapStateToProps)(
  ChatComponent
);
