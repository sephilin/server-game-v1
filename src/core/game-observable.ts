import { BaseObservable } from "./observer/base-observable";

export class GameObservable extends BaseObservable {

    notify = (message?: any): void => {
        // generate log of game calls...
        this.observers.map((observer) => {            
            observer.update(message);
        });
    }

}