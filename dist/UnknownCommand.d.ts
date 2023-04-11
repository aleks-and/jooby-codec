import Command from './Command.js';
/**
 * UnknownCommand command parameters.
 */
interface IUnknownCommandParameters {
    /** command id */
    id: number;
    /** raw data */
    data: Uint8Array;
}
/**
 * Unknown command.
 */
declare class UnknownCommand extends Command {
    parameters: IUnknownCommandParameters;
    constructor(parameters: IUnknownCommandParameters);
    static fromBytes(data: Uint8Array, id: number): UnknownCommand;
    toBytes(): Uint8Array;
}
export default UnknownCommand;
