import express from 'express';
import * as http from 'http';
import SocketIO from 'socket.io';
import { Server } from 'http';
import { SocketConnection } from './connection/socket-connection';
import { Game } from './game/game';

const port = process.env.PORT || 3000

class App {
  private _app: express.Application;
  private server: Server;
  private socketConnection: SocketConnection;
  private game: Game;

  constructor() {
    this._app = express();
    this.server = http.createServer(this._app);
    this.initSocket();
  }

  private initSocket = () => {
    const io = SocketIO(this.server);
    this.socketConnection = new SocketConnection(io);
  }

  private initGame = () => {
    if (!this.game) {
      this.game = new Game();
    }
    this.game.start();

    // subscribe socket connection new player
  }

  public listen() {
    this.server.listen(port, () => {
      console.log('Running server on port %s', port);
    });

    this.initGame();
    this.socketConnection.init();
  }
}

export default new App();