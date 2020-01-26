import { Player } from "../../player/player"
import { ScreenConfiguration } from "../constants/constants";

export class MoveCommands {
    constructor() { }

    ArrowUp = (player: Player) => {
        if (player.positionY - player.moveSpeed >= ScreenConfiguration.limiteTop) {
            player.positionY = player.positionY - player.moveSpeed
        } else {
            player.positionY = ScreenConfiguration.limiteTop;
        }
    }

    ArrowRight = (player: Player) => {
        if (player.positionX + player.moveSpeed < ScreenConfiguration.limiteRight) {
            player.positionX = player.positionX + player.moveSpeed
        } else {
            player.positionX = ScreenConfiguration.limiteRight;
        }
    }

    ArrowDown = (player: Player) => {
        if (player.positionY + player.moveSpeed < ScreenConfiguration.limiteBottom) {
            player.positionY = player.positionY + player.moveSpeed
        } else {
            player.positionY = ScreenConfiguration.limiteBottom;
        }
    }

    ArrowLeft = (player: Player) => {
        if (player.positionX - player.moveSpeed >= ScreenConfiguration.limiteLeft) {
            player.positionX = player.positionX - player.moveSpeed
        } else {
            player.positionX = ScreenConfiguration.limiteLeft;
        }
    }
}