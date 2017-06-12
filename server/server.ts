// Dependencies
import * as http from "http";
import * as express from "express";
import { middleware } from "./middleware";
import { routes } from "./routes";
import { init as initWebSockets } from "./websocket";
import { playerService } from "./services/player";
import { webSocketsService } from "./services/websocket";
import "./firebase-listener";

// Application stuff d
const port = process.env.PORT || 4000;

// App instances
const app = express();
const server = http.createServer(app);

// Init services
webSocketsService.init(server);
playerService.startTracking();

// Handlers
app.use(middleware);
app.use(routes);

// sockets
initWebSockets();

// Start listening
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
