import * as http from "http";
import { init as initWebSockets } from "./websocket";
import { playerService } from "./services/player";
import { webSocketsService } from "./services/websocket";
import "./firebase-listener";

/*******************
 *   APP CONFIG    *
 *******************/

const port = process.env.PORT || 4000;
const server = http.createServer();

/*******************
 *    SERVICES    *
 *******************/

webSocketsService.init(server);
playerService.startTracking();

/*******************
 *   WEB SOCKETS   *
 *******************/

initWebSockets();

/*******************
 * START LISTENING *
 *******************/

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
