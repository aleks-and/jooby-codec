/**
 * [[include:commands/downlink/CorrectTime2000.md]]
 *
 * @packageDocumentation
 */
import Command from '../../Command.js';
/**
 * CorrectTime2000 command parameters
 *
 * @example
 * // 120 seconds to the past
 * {sequenceNumber: 45, time: -120}
 */
interface IDownlinkCorrectTime2000Parameters {
    /** sequence Number */
    sequenceNumber: number;
    /**
     * seconds
     * range: [-127..+127]
     */
    time: number;
}
/**
 * Downlink command.
 *
 * @example
 * ```js
 * import CorrectTime2000 from 'jooby-codec/commands/downlink/CorrectTime2000';
 *
 * // 120 seconds to the past
 * const parameters = {sequenceNumber: 45, time: -120};
 * const command = new CorrectTime2000(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 0c 02 2d 88
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/CorrectTime2000.md#request)
 */
declare class CorrectTime2000 extends Command {
    parameters: IDownlinkCorrectTime2000Parameters;
    constructor(parameters: IDownlinkCorrectTime2000Parameters);
    static readonly id = 12;
    static readonly directionType = 1;
    static readonly title = "CORRECT_TIME_2000";
    static fromBytes(data: Uint8Array): CorrectTime2000;
    toBytes(): Uint8Array;
}
export default CorrectTime2000;
