import * as React from "react";
import { ChatComponent } from "./Chat";
import "./App.css";

export function App() {
  return (
    <div
      className="container"
      style={{ backgroundImage: "url('/assets/Yw5736L.png')" }}
    >
      <div className="top-content">
        <ChatComponent />
      </div>
    </div>
  );
}
