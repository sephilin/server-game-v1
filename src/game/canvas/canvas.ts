const iconSize: number = 25;

export class Canvas {
    limitePositionXLeft: number;
    limitePositionXRight: number;
    limitePositionYTop: number;
    limitePositionYBottom: number;

    constructor(private width: number, private height: number) {
        this.limitePositionXLeft = iconSize;
        this.limitePositionXRight = this.width - iconSize;
        this.limitePositionYTop = iconSize;
        this.limitePositionYBottom = this.height - iconSize;
    }

    public getIconSize() {
        return iconSize;
    }
}