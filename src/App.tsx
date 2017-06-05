import * as React from "react";
import { ChatComponent } from "./modules/Chat";
import { PlaylistComponent } from "./modules/Playlist";
import "./App.css";

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
    </div>
  );
}
