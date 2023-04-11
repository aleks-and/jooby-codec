import Command from '../../Command.js';
/**
 * Time2000 command parameters
 *
 * @example
 * // time: 2023-04-03T14:01:17.000Z
 * {sequenceNumber: 77, time: 733845677}
 */
interface ITime2000Parameters {
    /** sequence Number */
    sequenceNumber: number;
    /** seconds since year 2000 */
    time: number;
}
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import Time2000 from 'jooby-codec/commands/uplink/Time2000';
 *
 * // time: 2023-04-03T14:01:17.000Z
 * const parameters = {sequenceNumber: 77, time: 733845677};
 * const command = new Time2000(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 09 05 4d 2b bd 98 ad
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/uplink/Time2000.md)
 */
declare class Time2000 extends Command {
    parameters: ITime2000Parameters;
    constructor(parameters: ITime2000Parameters);
    static readonly id = 9;
    static readonly directionType = 2;
    static readonly title = "TIME_2000";
    static fromBytes(data: Uint8Array): Time2000;
    toBytes(): Uint8Array;
}
export default Time2000;
