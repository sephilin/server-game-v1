import { Observable } from "./observable";
import { Observer } from "./observer";

export class BaseObservable implements Observable {
    observers: Observer[];

    constructor() {
        this.observers = [];
    }

    private find = (observer: Observer): any => {
        let index = 0;
        const exist = this.observers.some((obs, i) => {
            index = i;
            return obs === observer;
        });
        return {
            exist,
            index
        };
    }

    public attach = (observer: Observer): void => {
        const { exist } = this.find(observer);

        if (exist) {
            return console.log('Observer already exist.');
        }

        this.observers.push(observer);
    }

    public detach = (observer: Observer): void => {
        const { exist, index } = this.find(observer);
        if (exist) {
            this.observers.splice(index, 1);
        } else {
            console.log('Observer not found');
        }
    }

    public notify = (): void => {
        throw Error('Method notify not overrided');
    }
}