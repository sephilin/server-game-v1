import { TypeEvent } from "../core/constants/constants";

export class GameEvent{
    public typeEvent : TypeEvent;
    public data: any;

    constructor(_typeEvent: TypeEvent, _data: any){
        this.typeEvent = _typeEvent;
        this.data = _data;
    }
}