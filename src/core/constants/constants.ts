export type TypeEvent = 'connect' | 'disconnect' | 'move' | 'confirm' | 'state';

const iconSize = 15;
const width = 500;
const height = 350;
const limiteTop = 15;
const limiteBottom = 345;
const limiteLeft = 0;
const limiteRight = 480;
const iconPlayer = '\uf1ba';
const iconPassagerFemale = '\uf182';
const iconPassagerMale = '\uf183';

export const ScreenConfiguration: {
    width: number
    height: number
    limiteTop: number
    limiteBottom: number
    limiteLeft: number
    limiteRight: number,
    iconSize: number,
    iconPlayer: string,
    iconPassagerFemale: string,
    iconPassagerMale: string
} = {
    width: width,
    height: height,
    limiteTop: limiteTop,
    limiteBottom: limiteBottom,
    limiteLeft: limiteLeft,
    limiteRight: limiteRight,
    iconSize: iconSize,
    iconPlayer: iconPlayer,
    iconPassagerFemale: iconPassagerFemale,
    iconPassagerMale: iconPassagerMale

}