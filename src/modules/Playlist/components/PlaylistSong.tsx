import * as React from "react";
import { Song } from "../../../types";
import "./PlaylistSong.css";

interface PlaylistSongProps {
  song: Song;
}

export const PlaylistSong = ({ song }: PlaylistSongProps) =>
  <li className="playlist-song">
    {song.name}
  </li>;
