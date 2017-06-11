import * as React from "react";
import { connect } from "react-redux";
import { AppState, CurrentSong } from "../../../types";
import * as Selectors from "../selectors";
import "./PlayerSongInfo.css";

/*******************
 *      PROPS      *
 *******************/

interface PlayerSongInfoProps {
  song?: CurrentSong;
}

/*******************
 *    COMPONENT    *
 *******************/

const PlayerSongInfoComponent = ({ song }: PlayerSongInfoProps) =>
  !song
    ? <div className="player-song" />
    : <div className="player-song">
        <div className="player-song-cover">
          <img
            className="player-song-cover"
            src="/assets/cover.jpg"
            alt="Album cover"
          />
        </div>

        <div className="player-song-info">
          <p className="player-song-title"> {song.name} </p>
          <p className="player-song-user"> {song.user} </p>
        </div>
      </div>;

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): PlayerSongInfoProps {
  const currentSong = Selectors.getCurrentSong(state);

  return {
    song: currentSong
  };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const PlayerSongInfo: React.ComponentClass<{}> = connect(
  mapStateToProps
)(PlayerSongInfoComponent);
