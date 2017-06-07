import * as io from "socket.io";
import { Server } from "http";

class WebSocketsService {
  io: SocketIO.Server;

  init(server: Server) {
    this.io = io(server);
  }

  broadcastMessage(message: string, content: any) {
    this.io.emit(message, content);
  }
}

export const webSocketsService = new WebSocketsService();
