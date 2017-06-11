import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../types";
import * as Selectors from "../selectors";
import "./PlayerProgressBar.css";

/*******************
 *      PROPS      *
 *******************/

interface ProgressBarProps {
  current: number;
  total?: number;
}

/*******************
 *    COMPONENT    *
 *******************/

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

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): ProgressBarProps {
  const currentDuration = Selectors.getCurrentSongDuration(state);
  const currentProgress = Selectors.getCurrentPlayerProgress(state);

  return {
    current: currentProgress,
    total: currentDuration
  };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const ProgressBar: React.ComponentClass<{}> = connect(mapStateToProps)(
  ProgressBarComponent
);
