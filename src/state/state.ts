import { Player } from "../player/player";
import { Passager } from "../passager/passager";
import { ScreenConfiguration } from "../core/constants/constants";

export class State {  
    players: Array<Player>;
    passagers: Array<Passager>;

    constructor() {
        this.players = [];
        this.passagers = [];
    }

    updateState = (newState: State) => {
        this.players = newState.players;
        this.passagers = newState.passagers;
    }

    findPlayer = (playerId: string): Player => {
        const player = this.players.find(p => p.id === playerId);
        return player as Player;
    }

    findPassager = (passagerId: number): Passager => {
        const player = this.passagers.find(p => p.id === passagerId);
        return player as Passager;
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
        this.passagers = this.passagers.filter(p => p.id !== passager.id);
    }   
}