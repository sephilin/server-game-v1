import express from 'express';
import * as http from 'http';
import SocketIO from 'socket.io';
import { Server } from 'http';

const port = process.env.PORT || 3000

class App {
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;

  constructor() {
    this._app = express();
    this.server = http.createServer(this._app);
    this.initSocket();
  }

  private initSocket(): void {
    this.io = SocketIO(this.server);
  }

  public listen(): void {
    // server listening on our defined port
    this.server.listen(port, () => {
      console.log('Running server on port %s', port);
    });


    //socket events
    this.io.on('connection', this.connection);
  }

  connection = (socket: SocketIO.Socket) => {
    console.log('connected with ID:', socket.id);
    //connection is up, let's add a simple simple event
    socket.on('message', this.onMessage);
    socket.on('disconnect', this.disconnect);
  }

  disconnect = (reason: string) => {
    console.log('disconnected:', reason);    
  }

  onMessage = (message: string) => {
    //log the received message and send it back to the client
    console.log(message);
    this.io.emit('broadcast', `Hello, you sent -> ${message}`);
  }

}

export default new App();