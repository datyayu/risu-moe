import * as React from "react";
import { connect } from "react-redux";
import * as NickModalActions from "../../NickModal/actions";
import "./ChatSettingsButton.css";

interface ChatSettingsButtonProps {
  openNickModal: () => void;
}

class ChatSettingsButtonComponent extends React.Component<
  ChatSettingsButtonProps,
  {}
> {
  render() {
    return (
      <div className="chat-settings-button" onClick={this.props.openNickModal}>
        <span className="chat-settings-button-text">
          Change nickname
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = {
  openNickModal: NickModalActions.toggleModal
};

export const ChatSettingsButton: React.ComponentClass<{}> = connect(
  undefined,
  mapDispatchToProps
)(ChatSettingsButtonComponent);
