import * as React from "react";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import * as Selectors from "../selectors";
import "./PlayerProgressBar.css";

interface ProgressBarProps {
  current: number;
  total?: number;
}

export const ProgressBarComponent = ({ current, total }: ProgressBarProps) => {
  const transformProgress = total ? current / total : 0;

  return (
    <div className="player-progress-bar">
      <div
        className="player-progress-current"
        style={{ transform: `scaleX(${transformProgress})` }}
      />
    </div>
  );
};

function mapStateToProps(state: AppState): ProgressBarProps {
  const currentDuration = Selectors.getCurrentSongDuration(state);
  const currentProgress = Selectors.getCurrentPlayerProgress(state);

  return {
    current: currentProgress,
    total: currentDuration
  };
}

export const ProgressBar: React.ComponentClass<{}> = connect(mapStateToProps)(
  ProgressBarComponent
);
