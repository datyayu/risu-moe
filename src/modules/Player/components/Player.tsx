import * as React from "react";
import { ProgressBar } from "./PlayerProgressBar";
import { PlayerSongInfo } from "./PlayerSongInfo";
import "./Player.css";

/*******************
 *    COMPONENT    *
 *******************/

export const Player = () =>
  <div className="player">
    <ProgressBar />
    <PlayerSongInfo />
  </div>;
