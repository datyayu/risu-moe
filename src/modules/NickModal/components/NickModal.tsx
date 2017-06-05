import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import * as Selectors from "../selectors";
import * as actions from "../actions";
import { NickModalInput } from "./NickModalInput";

interface NickModalState {
  nickInput: string;
  colorInput: string;
  isActive: boolean;
  inputsAreValid: boolean;
}

type NickModalDispatchers = {
  onColorChange: (a: string) => void;
  onNickChange: (a: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

type NickModalProps = NickModalState & NickModalDispatchers;

class NickModalComponent extends React.Component<NickModalProps, {}> {
  render() {
    if (!this.props.isActive) return null;

    const confirmButtonClasses = this.props.inputsAreValid
      ? "modal-button modal-button--confirm"
      : "modal-button modal-button--confirm modal-button--disabled";

    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <NickModalInput
            label="Choose your nickname"
            placeholder="Type your nickname here..."
            value={this.props.nickInput}
            onChange={this.props.onNickChange}
            onSubmit={this.props.onSubmit}
          />
          <NickModalInput
            label="Nickname color (HEX)"
            placeholder="Use FFFFFF format"
            value={this.props.colorInput}
            borderColor={
              this.props.inputsAreValid ? this.props.colorInput : "undefined"
            }
            onChange={this.props.onColorChange}
            onSubmit={this.props.onSubmit}
          />

          <div className="modal-buttons">
            <button
              className={confirmButtonClasses}
              onClick={this.props.onSubmit}
            >
              Accept
            </button>
            <button
              className="modal-button modal-button--neutral"
              onClick={this.props.onCancel}
            >
              No, thanks
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): NickModalState {
  return {
    colorInput: Selectors.getColorInput(state),
    nickInput: Selectors.getNickInput(state),
    isActive: Selectors.isModalActive(state),
    inputsAreValid: Selectors.areInputsValid(state)
  };
}

const mapDispatchToProps: NickModalDispatchers = {
  onColorChange: actions.updateColorInput,
  onNickChange: actions.updateNickInput,
  onSubmit: actions.submit,
  onCancel: actions.cancel
};

export const NickModal: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(NickModalComponent);
