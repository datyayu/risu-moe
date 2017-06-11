import * as React from "react";
import { connect } from "react-redux";
import * as NickModalActions from "../../NickModal/actions";
import "./ChatSettingsButton.css";

/*******************
 *      PROPS      *
 *******************/

interface ChatSettingsButtonProps {
  openNickModal: () => void;
}
/*******************
 *    COMPONENT    *
 *******************/

const ChatSettingsButtonComponent = ({
  openNickModal
}: ChatSettingsButtonProps) =>
  <div className="chat-settings-button" onClick={openNickModal}>
    <span className="chat-settings-button-text">
      Change nickname
    </span>
  </div>;

/*******************
 *    MAPPINGS     *
 *******************/

const mapDispatchToProps = {
  openNickModal: NickModalActions.toggleModal
};

/********************
 * CONNECTED EXPORT *
 ********************/

export const ChatSettingsButton: React.ComponentClass<{}> = connect(
  undefined,
  mapDispatchToProps
)(ChatSettingsButtonComponent);
