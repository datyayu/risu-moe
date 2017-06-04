import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { toggleChat } from "../actions";
import "./ChatMinimizeButton.css";

interface ChatMinimizeButtonProps {
  toggleChat: () => void;
}

const ChatMinimizeButtonComponent = ({ toggleChat }: ChatMinimizeButtonProps) =>
  <div className="chat-min-button" onClick={toggleChat}>
    <div className="chat-min-line" />
    <div className="chat-min-line" />
  </div>;

function mapStateToProps({ chat }: AppState) {
  return { minimized: chat.minimized };
}

const mapDispatchToProps = {
  toggleChat
};

export const ChatMinimizeButton: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMinimizeButtonComponent);
