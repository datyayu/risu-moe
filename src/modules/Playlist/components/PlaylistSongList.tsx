import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { Song } from "../../../types";
import { PlaylistSong } from "./PlaylistSong";
import "./PlaylistSongList.css";

interface PlaylistSongListProps {
  songs: Array<Song>;
}

const PlaylistSongListComponent = ({ songs = [] }: PlaylistSongListProps) =>
  <ul className="playlist-list">
    {songs.map((song, index) => <PlaylistSong key={index} song={song} />)}
  </ul>;

function mapStateToProps({ playlist }: AppState): PlaylistSongListProps {
  return {
    songs: playlist.songs
  };
}

export const PlaylistSongList: React.ComponentClass<{}> = connect(
  mapStateToProps
)(PlaylistSongListComponent);
