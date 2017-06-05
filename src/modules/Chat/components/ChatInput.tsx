import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { updateInput, postMessage } from "../actions";
import { ENTER } from "../../../config/key-codes";
import "./ChatInput.css";

interface ChatInputProps {
  text: string;
  updateInput: (a: string) => void;
  postMessage: (a: string) => void;
}

class ChatInputComponent extends React.Component<ChatInputProps, void> {
  constructor(props: ChatInputProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.props.updateInput(value);
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode !== ENTER) return;

    const value = (event.target as HTMLInputElement).value;
    this.props.postMessage(value);
  }

  render() {
    return (
      <input
        type="text"
        className="chat-input"
        placeholder="Type your message here..."
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.props.text}
      />
    );
  }
}

function mapStateToProps({ chat }: AppState) {
  return {
    text: chat.input
  };
}

const mapDispatchToProps = {
  updateInput,
  postMessage
};

export const ChatInput: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInputComponent);
