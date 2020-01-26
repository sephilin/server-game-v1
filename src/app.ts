import express from 'express';
import * as http from 'http';
import SocketIO from 'socket.io';
import { Server } from 'http';
import { WebSocket } from './core/web-socket';
import { Game } from './core/game';
import { GameObservable } from './core/game-observable';
import { WebSocketObservable } from './core/web-socket-observable';

const port = process.env.PORT || 3000

class App {
  private _app: express.Application;
  private server: Server;
  private webSocket: WebSocket;
  private game: Game;
 
  private gameObservable: GameObservable;
  private webSocketObservable: WebSocketObservable;

  constructor() {
    this._app = express();
    this.gameObservable = new GameObservable();
    this.webSocketObservable = new WebSocketObservable();

    this.server = http.createServer(this._app);
    this.StartWeSocketConnection();
  }

  private StartWeSocketConnection = () => {
    const io = SocketIO(this.server);
    io.origins('*:*');
    this.webSocket = new WebSocket(io, this.gameObservable);
  }

  private StartGameServer = () => {
    this.game = new Game(this.webSocketObservable);

    this.gameObservable.attach(this.game);
    this.webSocketObservable.attach(this.webSocket);
    

    this.game.start();
  }

  public listen() {
    this.server.listen(port, () => {
      console.log('Running server on port %s', port);
    });

    this.StartGameServer();
    this.webSocket.openConnection();
  }
}

export default new App();