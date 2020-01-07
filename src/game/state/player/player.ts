export class Player {
    id: string;
    points: number = 0;
    positionX: number;
    positionY: number;
    ready: boolean = false;
    moveSpeed: number = 5;

    constructor() { }
}