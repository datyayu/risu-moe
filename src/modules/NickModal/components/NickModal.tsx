import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../types";
import * as Selectors from "../selectors";
import * as actions from "../actions";
import { NickModalInput } from "./NickModalInput";

/*******************
 *      PROPS      *
 *******************/

interface NickModalState {
  nickInput: string;
  colorInput: string;
  isActive: boolean;
  areInputsValid: boolean;
}

type NickModalDispatchers = {
  onColorChange: (a: string) => void;
  onNickChange: (a: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

type NickModalProps = NickModalState & NickModalDispatchers;

/*******************
 *    COMPONENT    *
 *******************/

function NickModalComponent(props: NickModalProps) {
  if (!props.isActive) return <div />;

  const confirmButtonClasses = props.areInputsValid
    ? "modal-button modal-button--confirm"
    : "modal-button modal-button--confirm modal-button--disabled";

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <NickModalInput
          label="Choose your nickname"
          placeholder="Type your nickname here..."
          value={props.nickInput}
          onChange={props.onNickChange}
          onSubmit={props.onSubmit}
        />
        <NickModalInput
          label="Nickname color (HEX)"
          placeholder="Use FFFFFF format"
          value={props.colorInput}
          borderColor={props.areInputsValid ? props.colorInput : "undefined"}
          onChange={props.onColorChange}
          onSubmit={props.onSubmit}
        />

        <div className="modal-buttons">
          <button className={confirmButtonClasses} onClick={props.onSubmit}>
            Accept
          </button>
          <button
            className="modal-button modal-button--neutral"
            onClick={props.onCancel}
          >
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
}

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): NickModalState {
  const colorInput = Selectors.getColorInput(state);
  const nickInput = Selectors.getNickInput(state);
  const isActive = Selectors.isModalActive(state);
  const areInputsValid = Selectors.areInputsValid(state);

  return {
    colorInput,
    nickInput,
    isActive,
    areInputsValid
  };
}

const mapDispatchToProps: NickModalDispatchers = {
  onColorChange: actions.updateColorInput,
  onNickChange: actions.updateNickInput,
  onSubmit: actions.submit,
  onCancel: actions.cancel
};

/********************
 * CONNECTED EXPORT *
 ********************/

export const NickModal: React.ComponentClass<{}> = connect(
  mapStateToProps,
  mapDispatchToProps
)(NickModalComponent);
