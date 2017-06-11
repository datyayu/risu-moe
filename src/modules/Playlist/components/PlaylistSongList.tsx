import * as React from "react";
import { connect } from "react-redux";
import { AppState, Song } from "../../../types";
import * as Selectors from "../selectors";
import { PlaylistSong } from "./PlaylistSong";
import "./PlaylistSongList.css";

/*******************
 *      PROPS      *
 *******************/

interface PlaylistSongListProps {
  songs: Array<Song>;
}

/*******************
 *    COMPONENT    *
 *******************/

const PlaylistSongListComponent = ({ songs = [] }: PlaylistSongListProps) =>
  <ul className="playlist-list">
    {songs.map((song, index) => <PlaylistSong key={index} song={song} />)}
  </ul>;

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): PlaylistSongListProps {
  const playlistSongs = Selectors.getPlaylistSongs(state);

  return { songs: playlistSongs };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const PlaylistSongList: React.ComponentClass<{}> = connect(
  mapStateToProps
)(PlaylistSongListComponent);
