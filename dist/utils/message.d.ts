import Command from '../Command.js';
import { IHexFormatOptions } from './getHexFromBytes.js';
interface IMessageCommand {
    /** command source binary data */
    data: {
        header: Uint8Array;
        body: Uint8Array;
    };
    /** specific command instance */
    command: Command;
}
interface IMessage {
    commands: Array<IMessageCommand>;
    lrc: {
        expected: number;
        actual: number;
    };
    isValid: boolean;
}
export declare const fromBytes: (data: Uint8Array, direction?: number) => IMessage;
export declare const fromHex: (data: string, direction?: number) => IMessage;
export declare const toBytes: (commands: Array<Command>) => Uint8Array;
export declare const toHex: (commands: Array<Command>, options?: IHexFormatOptions) => string;
export {};
