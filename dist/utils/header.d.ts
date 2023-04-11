import { IHexFormatOptions } from './getHexFromBytes.js';
export declare const fromBytes: (data: Uint8Array) => {
    headerSize: number;
    commandId: number;
    commandSize: number;
};
export declare const fromHex: (data: string) => {
    headerSize: number;
    commandId: number;
    commandSize: number;
};
export declare const toBytes: (commandId: number, commandSize: number) => Uint8Array;
export declare const toHex: (commandId: number, commandSize: number, options?: IHexFormatOptions) => string;
