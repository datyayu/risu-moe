import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../types";
import * as Selectors from "../selectors";
import { PlaylistSongList } from "./PlaylistSongList";
import { PlaylistTitle } from "./PlaylistTitle";
import { PlaylistMinimizeButton } from "./PlaylistMinimizeButton";
import "./Playlist.css";

/*******************
 *      PROPS      *
 *******************/

interface PlaylistComponentProps {
  minimized: boolean;
}

/*******************
 *    COMPONENT    *
 *******************/

const PlaylistComponent = ({ minimized }: PlaylistComponentProps) =>
  <div className={`playlist ${minimized ? "playlist--min" : ""}`}>
    <PlaylistMinimizeButton />
    <PlaylistTitle />
    <PlaylistSongList />
  </div>;

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState) {
  const minimized = Selectors.isPlaylistMinimized(state);

  return { minimized };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const Playlist: React.ComponentClass<{}> = connect(mapStateToProps)(
  PlaylistComponent
);
