import { ScreenConfiguration } from "../core/constants/constants";

export class Player {
    id: string;
    points: number = 0;
    positionX: number;
    positionY: number;
    ready: boolean = false;    
    moveSpeed: number = 5;
    allowedToMove: boolean = true;


    constructor(_id: string) {
        this.id = _id;
    }

    public createNewPlayer = (): Player => {
        const player = {
            ...this,
            positionX: this.getNewPositionX(ScreenConfiguration.width),
            positionY: this.getNewPositionY(ScreenConfiguration.height)
        } as Player;

        player.positionX = player.positionX < ScreenConfiguration.limiteTop ? ScreenConfiguration.limiteTop : player.positionX;
        player.positionX = player.positionX > ScreenConfiguration.limiteBottom ? ScreenConfiguration.limiteBottom : player.positionX;

        player.positionY = player.positionY < ScreenConfiguration.limiteLeft ? ScreenConfiguration.limiteLeft : player.positionY;
        player.positionY = player.positionY > ScreenConfiguration.limiteRight ? ScreenConfiguration.limiteRight : player.positionY;

        return player;
    }

    private getNewPositionX = (width: number): number => {
        const rangeX = (width / ScreenConfiguration.iconSize);
        const randomPointX = Math.floor(Math.random() * rangeX);
        const positionX = Math.round((randomPointX > 0 ? randomPointX : 1) * ScreenConfiguration.iconSize);
        return positionX;
    }

    private getNewPositionY = (heigth: number): number => {
        const rangeY = (heigth / ScreenConfiguration.iconSize);
        const randomPointY = Math.floor(Math.random() * rangeY);
        const positionY = Math.floor((randomPointY > 0 ? randomPointY : 1) * ScreenConfiguration.iconSize);
        return positionY;
    }
}