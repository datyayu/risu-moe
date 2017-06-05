import * as React from "react";
import { connect } from "react-redux";
import { togglePlaylist } from "../actions";
import "./PlaylistMinimizeButton.css";

interface PlaylistMinimizeButtonProps {
  togglePlaylist: () => void;
}

const PlaylistMinimizeButtonComponent = ({
  togglePlaylist
}: PlaylistMinimizeButtonProps) =>
  <div className="playlist-min-button" onClick={togglePlaylist}>
    <div className="playlist-min-line" />
    <div className="playlist-min-line" />
  </div>;

const mapDispatchToProps = {
  togglePlaylist
};

export const PlaylistMinimizeButton: React.ComponentClass<{}> = connect(
  null,
  mapDispatchToProps
)(PlaylistMinimizeButtonComponent);
