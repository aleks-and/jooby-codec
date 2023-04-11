/**
 * [[include:commands/downlink/SetTime2000.md]]
 *
 * @packageDocumentation
 */
import Command from '../../Command.js';
/**
 * SetTime2000 command parameters
 *
 * @example
 * // time: 2023-04-03T14:01:17.000Z
 * {sequenceNumber: 77, time: 733845677}
 */
interface IDownlinkSetTime2000Parameters {
    /** sequence Number */
    sequenceNumber: number;
    /** seconds */
    time: number;
}
/**
 * Downlink command.
 *
 * @example
 * ```js
 * import SetTime2000 from 'jooby-codec/commands/downlink/SetTime2000';
 *
 * const parameters = {sequenceNumber: 78, time: 123456};
 * const command = new SetTime2000(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 02 05 4e 00 01 e2 40
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/SetTime2000.md#request)
 */
declare class SetTime2000 extends Command {
    parameters: IDownlinkSetTime2000Parameters;
    constructor(parameters: IDownlinkSetTime2000Parameters);
    static readonly id = 2;
    static readonly directionType = 1;
    static readonly title = "SET_TIME_2000";
    static fromBytes(data: Uint8Array): SetTime2000;
    toBytes(): Uint8Array;
}
export default SetTime2000;
