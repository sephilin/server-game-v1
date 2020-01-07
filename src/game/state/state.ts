import { Player } from "./player/player";
import { Passager } from "./passager/passager";
import { Status } from "./status/status";

export class State {
    players: Array<Player>;
    passagers: Array<Passager>;

    constructor(public status: Status) {
        this.players = [];
        this.passagers = [];
    }

    updateState = (newState: State) => {
        this.players = newState.players;
        this.passagers = newState.passagers;
    }

    addPlayer = (player: Player) => {
        this.players.push(player);
    }

    addPassager = (passager: Passager) => {        
        this.passagers.push(passager);
    }

    removePlayer = (player: Player) => {
        this.players = this.players.filter(p => p.id !== player.id);
    }

    removePassager = (passager: Passager) => {
        this.passagers = this.passagers.filter(p =>
            p.positionX !== passager.positionX &&
            p.positionY !== passager.positionY);
    }
}