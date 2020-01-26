import { BaseObservable } from "./observer/base-observable";
import { GameEvent } from "../game-event/game-event";

export class WebSocketObservable extends BaseObservable {

    notify = (event?: GameEvent): void => {
        // generate log of websocket calls...
        this.observers.map((observer) => {
            observer.update(event);
        });   
    }

}