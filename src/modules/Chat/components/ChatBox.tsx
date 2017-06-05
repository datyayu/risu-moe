import * as React from "react";
import { connect } from "react-redux";
import { Message } from "../../../types";
import { AppState } from "../../../store";
import * as Selectors from "../selectors";
import { ChatMessage } from "./ChatMessage";
import "./ChatBox.css";

interface ChatBoxProps {
  messages: Array<Message>;
}

class ChatBoxComponent extends React.Component<ChatBoxProps, {}> {
  props: ChatBoxProps;

  componentDidUpdate() {
    const element = document.getElementById("js-chat-box");
    if (!element) return;

    element.scrollTop = element.scrollHeight;
  }

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

function mapStateToProps(state: AppState): ChatBoxProps {
  return { messages: Selectors.getMessages(state) };
}

export const ChatBox: React.ComponentClass<{}> = connect(mapStateToProps)(
  ChatBoxComponent
);
