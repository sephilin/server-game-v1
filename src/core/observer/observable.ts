import { Observer } from "./observer";

export interface Observable { 
    observers: Observer[];
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}