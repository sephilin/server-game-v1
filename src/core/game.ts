import { Passager } from './../passager/passager';
import { Player } from './../player/player';
import { GameObservable } from "./game-observable";
import { Observer } from "./observer/observer";
import { State } from "../state/state";
import { GameEvent } from "../game-event/game-event";
import { MoveCommands } from './move-commands/move-commands';
import { ScreenConfiguration } from './constants/constants';

const frequency = 4000;

export class Game implements Observer {

    private state: State;

    private moveCommands: any;

    update = (event: GameEvent): void => {
        switch (event.typeEvent) {
            case 'connect':
                console.log('connect ...');
                this.connectPlayer(event);
                break;

            case 'disconnect':
                console.log('disconnect ...');
                this.disconnectPlayer(event);
                break;

            case 'move':
                this.movePlayer(event);
                break;

            case 'confirm':
                console.log('confirm ...');
                this.confirmGame(event);
                break;
        }
    }

    constructor(private _websocketObservable: GameObservable) {
        this.state = new State();
        this.moveCommands = new MoveCommands();
    }

    private notifyAllPlayers = () => {
        this._websocketObservable.notify({
            typeEvent: 'state',
            data: this.state
        } as GameEvent);
    }

    private connectPlayer = (event: GameEvent) => {
        const playerId = event.data as string;
        const player = new Player(playerId).createNewPlayer();

        this.state.addPlayer(player);
        this.notifyAllPlayers();
    }

    private disconnectPlayer = (event: GameEvent) => {
        const playerId = event.data.playerId as string;
        const reason = event.data.reason as string;
        const player = this.state.findPlayer(playerId);

        this.state.removePlayer(player);
        this.notifyAllPlayers();
    }

    private movePlayer = (event: GameEvent) => {
        const playerId = event.data.playerId as string;
        const key = event.data.key as string;
        const player = this.state.findPlayer(playerId);
        const moveCommand = this.moveCommands[key] ? this.moveCommands[key] : undefined;

        if (moveCommand) {
            if (player.allowedToMove) {
                moveCommand(player);
                this.detectCollision(player);

                this.notifyAllPlayers();
                console.log(`x: ${player.positionX} | y: ${player.positionY}`);
            }
        }
        else
            console.log('Command not implemented: ', key);
    }

    private confirmGame = (event: GameEvent) => {
        const playerId = event.data.playerId as string;
        const player = this.state.findPlayer(playerId);
        player.ready != player.ready;
    }

    private getLimitePassagersOnScreen = (): number => {
        const total = 5 + Math.round(this.state.players.length * 5);
        return total;
    }


    private calculateCollision = (x1: number, y1: number, x2: number, y2: number) => {
        const iconSize = ScreenConfiguration.iconSize;
        var rect1 = { x: x1, y: y1, width: iconSize, height: iconSize };
        var rect2 = { x: x2, y: y2, width: iconSize, height: iconSize };

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            return true;
        }
        return false;
    }

    private checkCollision = (x1: number, y1: number, passager: Passager) => {
        const iconSize = ScreenConfiguration.iconSize;
        var rect1 = { x: x1, y: y1, width: iconSize, height: iconSize };

        if (rect1.x < passager.locateArea.toX &&
            rect1.x + rect1.width > passager.locateArea.fromX &&
            rect1.y < passager.locateArea.toY &&
            rect1.height + rect1.y > passager.locateArea.fromY) {
            return true;
        }
        return false;
    }

    private detectCollision = (player: Player) => {
        this.state.passagers.forEach(passager => {
            const colide = this.checkCollision(player.positionX, player.positionY, passager);
            if (colide) {
                console.log(passager.locateArea);
                this.state.removePassager(passager);
                this.noMovementByDuration(player, 3000);
                this.increasePoints(player, 1);
                return;
            }
        });
    }

    private increasePoints = (player: Player, pointValue: number) => {
        player.points += pointValue;       
    }

    private noMovementByDuration = (player: Player, duration: number) => {
        player.allowedToMove = false;       
       setTimeout(() => {
           player.allowedToMove = true;                 
       }, duration);
    }

    start = () => {
        console.log('start game...');
        setInterval(() => {

            if (this.state.players.length > 0) {
                if (this.state.passagers.length < this.getLimitePassagersOnScreen()) {
                    const passager = new Passager().createNewPassager();
                    this.state.addPassager(passager);
                }
            } else {
                this.state.updateState(new State());
            }

            this.notifyAllPlayers();
        }, frequency);
    }

}