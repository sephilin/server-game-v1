import { WebSocketObservable } from "./web-socket-observable";
import { Observer } from "./observer/observer";
import { GameEvent } from "../game-event/game-event";

export class WebSocket implements Observer {

    update = (event: GameEvent): void => {

        switch (event.typeEvent) {
            case 'state':
               
                this.io.emit(event.typeEvent, event.data);
                break;
        }

    }

    constructor(private io: SocketIO.Server,
        private _gameObservable: WebSocketObservable) {

    }

    public openConnection = () => {
        this.io.on('connection', (socket: SocketIO.Socket) => {
            const playerId = socket.id;
            this.io.to(socket.id).emit('connected', playerId);

            this._gameObservable.notify({
                typeEvent: 'connect',
                data: playerId
            } as GameEvent);

            socket.on('disconnect', (reason) => {

                this._gameObservable.notify({
                    typeEvent: 'disconnect',
                    data: {
                        playerId: playerId,
                        reason: reason
                    }
                } as GameEvent);
            });

            socket.on('move', (event) => {
                this._gameObservable.notify(event);
            });

            socket.on('confirm', (data) => {

                this._gameObservable.notify({
                    typeEvent: 'confirm',
                    data: data
                } as GameEvent);
            });
        });
    }
}