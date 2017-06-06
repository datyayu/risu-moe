import * as React from "react";
import { ChatComponent } from "./modules/Chat";
import { PlaylistComponent } from "./modules/Playlist";
import { PlayerComponent } from "./modules/Player";
import { NickModalComponent } from "./modules/NickModal";
import { UploadFileOverlayComponent } from "./modules/UploadFileOverlay";
import "./App.css";
import "./modal.css";

export function App() {
  return (
    <div
      className="container"
      style={{ backgroundImage: "url('/assets/Yw5736L.png')" }}
    >
      <div className="top-content">
        <ChatComponent />
        <PlaylistComponent />
      </div>

      <PlayerComponent />
      <NickModalComponent />
      <UploadFileOverlayComponent />
    </div>
  );
}
