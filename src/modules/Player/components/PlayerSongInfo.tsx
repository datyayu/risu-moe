import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { Song } from "../../../types";
import * as PlaylistSelectors from "../../Playlist/selectors";
import "./PlayerSongInfo.css";

interface PlayerSongInfoProps {
  song?: Song;
}

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

function mapStateToProps(state: AppState): PlayerSongInfoProps {
  return {
    song: PlaylistSelectors.getCurrentSong(state)
  };
}

export const PlayerSongInfo: React.ComponentClass<{}> = connect(
  mapStateToProps
)(PlayerSongInfoComponent);
