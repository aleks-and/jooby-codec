import Command from '../../Command.js';
/**
 * CorrectTime2000 command parameters
 *
 * @example
 * {status: 1}
 */
interface IUplinkCorrectTime2000Parameters {
    status: number;
}
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import CorrectTime2000 from 'jooby-codec/commands/uplink/CorrectTime2000';
 *
 * // failure
 * const parameters = {status: 0};
 * const command = new CorrectTime2000(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 0c 01 00
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/CorrectTime2000.md#response)
 */
declare class CorrectTime2000 extends Command {
    parameters: IUplinkCorrectTime2000Parameters;
    constructor(parameters: IUplinkCorrectTime2000Parameters);
    static readonly id = 12;
    static readonly directionType = 2;
    static readonly title = "CORRECT_TIME_2000";
    static fromBytes(data: Uint8Array): CorrectTime2000;
    toBytes(): Uint8Array;
}
export default CorrectTime2000;
