import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { PlaylistSongList } from "./PlaylistSongList";
import { PlaylistTitle } from "./PlaylistTitle";
import { PlaylistMinimizeButton } from "./PlaylistMinimizeButton";
import "./Playlist.css";

interface PlaylistComponentProps {
  minimized: boolean;
}

const PlaylistComponent = ({ minimized }: PlaylistComponentProps) =>
  <div className={`playlist ${minimized ? "playlist--min" : ""}`}>
    <PlaylistMinimizeButton />
    <PlaylistTitle />
    <PlaylistSongList />
  </div>;

function mapStateToProps({ playlist }: AppState) {
  return {
    minimized: playlist.minimized
  };
}

export const Playlist: React.ComponentClass<{}> = connect(mapStateToProps)(
  PlaylistComponent
);
