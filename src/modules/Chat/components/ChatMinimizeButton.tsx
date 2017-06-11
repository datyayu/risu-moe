import * as React from "react";
import { connect } from "react-redux";
import { toggleChat } from "../actions";
import "./ChatMinimizeButton.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatMinimizeButtonProps {
  toggleChat: () => void;
}

/*******************
 *    COMPONENT    *
 *******************/

const ChatMinimizeButtonComponent = ({ toggleChat }: ChatMinimizeButtonProps) =>
  <div className="chat-min-button" onClick={toggleChat}>
    <div className="chat-min-line" />
    <div className="chat-min-line" />
  </div>;

/*******************
 *    MAPPINGS     *
 *******************/

const mapDispatchToProps = {
  toggleChat
};

/********************
 * CONNECTED EXPORT *
 ********************/

export const ChatMinimizeButton: React.ComponentClass<{}> = connect(
  undefined,
  mapDispatchToProps
)(ChatMinimizeButtonComponent);
