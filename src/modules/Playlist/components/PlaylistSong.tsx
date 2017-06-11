import * as React from "react";
import { Song } from "../../../types";
import "./PlaylistSong.css";

/*******************
 *      PROPS      *
 *******************/

interface PlaylistSongProps {
  song: Song;
}

/*******************
 *    COMPONENT    *
 *******************/

export const PlaylistSong = ({ song }: PlaylistSongProps) =>
  <li className="playlist-song">
    {song.name}
  </li>;
