import * as io from "socket.io";
import { Server } from "http";

/*******************
 *     SERVICE     *
 *******************/

class WebSocketsService {
  io: SocketIO.Server;

  /**
   * Create a SocketIO.Server an mounted it on an existing
   * http server.
   *
   * @param server Server to mount the io listener on.
   */
  init(server: Server) {
    this.io = io(server);
  }

  /**
   * Broadcast a message to all conected clients.
   *
   * @param message Message name to broadcast.
   * @param content Message content to broadcast.
   */
  broadcastMessage(message: string, content: any) {
    this.io.emit(message, content);
  }
}

export const webSocketsService = new WebSocketsService();
