import { ScreenConfiguration } from "../core/constants/constants";

export class Passager{
    id: number;
    positionX: number;
    positionY: number;
    type: number; // 0 - man / 1 - woman

    locateArea: {
        fromX: number,
        toX: number,
        fromY: number,
        toY: number
    };


    public createNewPassager = (): Passager => {
        const passager = {
            ...this,
            id:Math.floor(Math.random() * 10000),
            type: Math.round(Math.random()),
            positionX: this.getNewPositionX(ScreenConfiguration.width),
            positionY: this.getNewPositionY(ScreenConfiguration.height)
        } as Passager;        

        passager.positionX = passager.positionX < ScreenConfiguration.limiteLeft ? ScreenConfiguration.limiteLeft : passager.positionX;
        passager.positionX = passager.positionX > ScreenConfiguration.limiteRight ? ScreenConfiguration.limiteRight : passager.positionX;

        passager.positionY = passager.positionY < ScreenConfiguration.limiteTop ? ScreenConfiguration.limiteTop : passager.positionY;
        passager.positionY = passager.positionY > ScreenConfiguration.limiteBottom ? ScreenConfiguration.limiteBottom : passager.positionY;

        passager.locateArea = {
            fromX: passager.positionX,
            toX: passager.positionX + (ScreenConfiguration.iconSize - 5),
            fromY: passager.positionY,
            toY: passager.positionY + (ScreenConfiguration.iconSize)
        }        
        return passager;
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