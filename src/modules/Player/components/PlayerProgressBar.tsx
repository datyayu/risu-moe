import * as React from "react";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import * as PlayerSelectors from "../selectors";
import * as PlaylistSelectors from "../../Playlist/selectors";
import "./PlayerProgressBar.css";

interface ProgressBarProps {
  current: number;
  total?: number;
}

export const ProgressBarComponent = ({ current, total }: ProgressBarProps) => {
  const widthPercentage = total ? `${current / total * 100}%` : "32%";

  return (
    <div className="player-progress-bar">
      <div
        className="player-progress-current"
        style={{ width: widthPercentage }}
      />
    </div>
  );
};

function mapStateToProps(state: AppState): ProgressBarProps {
  const currentSong = PlaylistSelectors.getCurrentSong(state);
  const currentProgress = PlayerSelectors.getCurrentPlayerProgress(state);

  return {
    current: currentProgress,
    total: currentSong && parseInt(currentSong.duration, 10)
  };
}

export const ProgressBar: React.ComponentClass<{}> = connect(mapStateToProps)(
  ProgressBarComponent
);
