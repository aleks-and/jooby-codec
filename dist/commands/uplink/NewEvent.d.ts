import Command from '../../Command.js';
interface IEventBase {
}
/**
 * NewEvent command parameters
 *
 * @example
 * ```js
 * import {constants} from 'jooby-codec'
 *
 * // `Magnet On` event at 2023-04-05 13:17:20 GMT
 * {id: constants.events.MAGNET_ON, sequenceNumber: 1, data: {time: 734015840}}
 */
interface INewEventParameters {
    id: number;
    sequenceNumber: number;
    data: IEventBase;
}
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import {constants} from 'jooby-codec'
 * import NewEvent from 'jooby-codec/commands/uplink/NewEvent';
 *
 * // `Magnet On` event at 2023-04-05 13:17:20 GMT
 * const parameters = {id: constants.events.MAGNET_ON, sequenceNumber: 3, data: {time: 734015840}}
 * const command = new NewEvent(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 15 06 01 03 2b c0 31 60
 * ```
 *
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/uplink/NewEvent.md)
 */
declare class NewEvent extends Command {
    parameters: INewEventParameters;
    constructor(parameters: INewEventParameters);
    static readonly id = 21;
    static readonly directionType = 2;
    static readonly title = "NEW_EVENT";
    static fromBytes(data: Uint8Array): NewEvent;
    toBytes(): Uint8Array;
}
export default NewEvent;
