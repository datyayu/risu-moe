import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../types";
import * as Selectors from "../selectors";
import { ChatTitle } from "./ChatTitle";
import { ChatContent } from "./ChatContent";
import { ChatMinimizeButton } from "./ChatMinimizeButton";
import { ChatOnlineUserList } from "./ChatOnlineUserList";
import { ChatSettingsButton } from "./ChatSettingsButton";
import "./Chat.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatProps {
  minimized: boolean;
}

/*******************
 *    COMPONENT    *
 *******************/

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

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): ChatProps {
  const minimized = Selectors.isChatMinimized(state);

  return { minimized };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const Chat: React.ComponentClass<{}> = connect(mapStateToProps)(
  ChatComponent
);
