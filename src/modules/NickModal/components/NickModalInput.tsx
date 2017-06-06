import * as React from "react";
import { ENTER } from "../../../config/key-codes";

interface NickModalInputProps {
  label: string;
  value: string;
  placeholder: string;
  borderColor?: string;
  onSubmit?: () => void;
  onChange?: (a: string) => void;
}

export class NickModalInput extends React.Component<NickModalInputProps, {}> {
  constructor(props: NickModalInputProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.onChange) return;

    const value = event.target.value;
    this.props.onChange(value);
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!this.props.onSubmit) return;

    if (event.keyCode === ENTER) {
      this.props.onSubmit();
    }
  }

  render() {
    const customBorder = `3px solid #${this.props.value}`;

    return (
      <div>
        <h3 className="modal-title"> {this.props.label} </h3>
        <input
          className="modal-input"
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          style={{ border: customBorder }}
        />
      </div>
    );
  }
}
