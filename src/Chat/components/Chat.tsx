import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../../store";
import { ChatTitle } from "./ChatTitle";
import { ChatContent } from "./ChatContent";
import { ChatMinimizeButton } from "./ChatMinimizeButton";
import { ChatOnlineUserList } from "./ChatOnlineUserList";
import { ChatSettingsButton } from "./ChatSettingsButton";
import "./Chat.css";

type ChatProps = {
  minimized: boolean;
};

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

function mapStateToProps({ chat }: AppState): ChatProps {
  return { minimized: chat.minimized };
}

export const Chat: React.ComponentClass<{}> = connect(mapStateToProps)(
  ChatComponent
);
