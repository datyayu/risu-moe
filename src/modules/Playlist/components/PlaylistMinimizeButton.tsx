import * as React from "react";
import { connect } from "react-redux";
import { togglePlaylist } from "../actions";
import "./PlaylistMinimizeButton.css";

/*******************
 *      PROPS      *
 *******************/

interface PlaylistMinimizeButtonProps {
  togglePlaylist: () => void;
}

/*******************
 *    COMPONENT    *
 *******************/

const PlaylistMinimizeButtonComponent = ({
  togglePlaylist
}: PlaylistMinimizeButtonProps) =>
  <div className="playlist-min-button" onClick={togglePlaylist}>
    <div className="playlist-min-line" />
    <div className="playlist-min-line" />
  </div>;

/*******************
 *    MAPPINGS     *
 *******************/

const mapDispatchToProps = {
  togglePlaylist
};

/********************
 * CONNECTED EXPORT *
 ********************/

export const PlaylistMinimizeButton: React.ComponentClass<{}> = connect(
  null,
  mapDispatchToProps
)(PlaylistMinimizeButtonComponent);
