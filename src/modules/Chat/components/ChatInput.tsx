import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../types";
import { ENTER } from "../../../config/key-codes";
import { updateInput, postMessage } from "../actions";
import * as Selectors from "../selectors";
import "./ChatInput.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatInputProps {
  text: string;
  updateInput: (a: string) => void;
  postMessage: (a: string) => void;
}

/*******************
 *    COMPONENT    *
 *******************/

class ChatInputComponent extends React.Component<ChatInputProps, void> {
  constructor(props: ChatInputProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * On input change, dispatch an action to update
   * the input value.
   *
   * @param event Change event emitted.
   */
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.props.updateInput(value);
  }

  /**
   * On input keydown, if the ENTER key was pressed,
   * dispatch an action to post the message to the
   * database.
   *
   * @param event Keyboard event emitted.
   */
  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode !== ENTER) return;

    const value = (event.target as HTMLInputElement).value;
    this.props.postMessage(value);
  }

  /**
   * Component render function.
   */
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

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState) {
  const inputValue = Selectors.getChatInputValue(state);

  return { text: inputValue };
}

const mapDispatchToProps = {
  updateInput,
  postMessage
};

/********************
 * CONNECTED EXPORT *
 ********************/

export const ChatInput: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInputComponent);
