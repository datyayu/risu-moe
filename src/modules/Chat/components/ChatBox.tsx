import * as React from "react";
import { connect } from "react-redux";
import { AppState, Message } from "../../../types";
import * as Selectors from "../selectors";
import { ChatMessage } from "./ChatMessage";
import "./ChatBox.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatBoxProps {
  messages: Array<Message>;
}

/*******************
 *    COMPONENT    *
 *******************/

class ChatBoxComponent extends React.Component<ChatBoxProps, {}> {
  /**
   * On update, scroll down. This ensures that when a
   * new message arrives, it's show as soon as it's
   * added to the chatbox.
   */
  componentDidUpdate() {
    const element = document.getElementById("js-chat-box");
    if (!element) return;

    element.scrollTop = element.scrollHeight;
  }

  /**
   * Component render.
   */
  render() {
    return (
      <div className="chat-box" id="js-chat-box">
        {this.props.messages.map((msg, index) =>
          <ChatMessage key={index} message={msg} />
        )}
      </div>
    );
  }
}

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): ChatBoxProps {
  const messages = Selectors.getMessages(state);

  return { messages };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const ChatBox: React.ComponentClass<{}> = connect(mapStateToProps)(
  ChatBoxComponent
);
