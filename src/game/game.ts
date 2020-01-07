import { State } from "./state/state";
import { Canvas } from "./canvas/canvas";
import { Status } from "./state/status/status";
import { Passager } from "./state/passager/passager";
import { Player } from "./state/player/player";

const frequency = 2000;
const width = 400;
const heigth = 300;

export class Game {
    state: State;
    canvas: Canvas;

    constructor() {
        this.state = new State(Status.Waiting);
        this.canvas = new Canvas(width, heigth);
    }

    private ArrowUp = (player: Player) => {
        if (player.positionY - player.moveSpeed >= this.canvas.limitePositionYTop) {
            player.positionY = player.positionY - player.moveSpeed
        }
    }

    private ArrowRight(player: Player) {
        if (player.positionX + player.moveSpeed < this.canvas.limitePositionXRight) {
            player.positionX = player.positionX + player.moveSpeed
        }
    }

    private ArrowDown(player: Player) {
        if (player.positionY + player.moveSpeed < this.canvas.limitePositionYBottom) {
            player.positionY = player.positionY + player.moveSpeed
        }
    }

    private ArrowLeft(player: Player) {
        if (player.positionX - player.moveSpeed >= this.canvas.limitePositionXLeft) {
            player.positionX = player.positionX - player.moveSpeed
        }
    }

    private getNewPositionX = (): number => {
        return Math.floor(Math.random() * this.canvas.limitePositionXRight);
    }

    private getNewPositionY = (): number => {
        return Math.floor(Math.random() * this.canvas.limitePositionYBottom);
    }

    private createNewPassager = (): Passager => {
        const passager = new Passager();
        passager.id = Math.floor(Math.random() * 10000);
        passager.positionX = this.getNewPositionX();
        passager.positionY = this.getNewPositionY();
        passager.type = Math.random();

        return passager;
    }

    private addNewPlayer = (id: string) => {
        const player = new Player();
        player.id = id;
        player.positionX = this.getNewPositionX();
        player.positionY = this.getNewPositionY();
        this.state.addPlayer(player);
    }

    private CalcDistance = (x1: number, y1: number, x2: number, y2: number) => {
        const dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        return Math.round(dist * 10) / 10;
    }

    private validateCollision = (player: Player) => {
        this.state.passagers.forEach(passager => {
            const d = this.CalcDistance(player.positionX, player.positionY, passager.positionX, passager.positionY);
            if (d <= this.canvas.getIconSize() / 2) {
                this.state.removePassager(passager);
                return;
            }
        });
    }

    waitAllConfirm = () => {
        if (this.state.status === Status.Waiting)
            if (this.state.players.every((p) => {
                return p.ready === true;
            })) {
                this.state.status = Status.Running;
            }
    }

    start = () => {
        console.log('start game...');
        setInterval(() => {
            console.log('waiting players to confirm...');
            if (this.state.status === Status.Running) {
                this.state.addPassager(this.createNewPassager());
            }

        }, frequency);
    }


    movePlayer = (command: { playerId: string, keyPressed: string }) => {
        const player = this.state.players.find(p => p.id === command.playerId) as Player;

        this.validateCollision(player);
    }

}