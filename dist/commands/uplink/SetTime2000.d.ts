import Command from '../../Command.js';
/**
 * SetTime2000 command parameters
 *
 * @example
 * {status: 1}
 */
interface IUplinkSetTime2000Parameters {
    status: number;
}
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import SetTime2000 from 'jooby-codec/commands/uplink/SetTime2000';
 *
 * // success
 * const parameters = {status: 1};
 * const command = new SetTime2000(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 02 01 01
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/SetTime2000.md#response)
 */
declare class SetTime2000 extends Command {
    parameters: IUplinkSetTime2000Parameters;
    constructor(parameters: IUplinkSetTime2000Parameters);
    static readonly id = 2;
    static readonly directionType = 2;
    static readonly title = "SET_TIME_2000";
    static fromBytes(data: Uint8Array): SetTime2000;
    toBytes(): Uint8Array;
}
export default SetTime2000;
