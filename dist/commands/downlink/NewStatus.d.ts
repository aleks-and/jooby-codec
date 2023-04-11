import Command from '../../Command.js';
/**
 * Downlink command.
 *
 * @example
 * ```js
 * import NewStatus from 'jooby-codec/commands/downlink/NewStatus';
 *
 * const command = new NewStatus();
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 14 00
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/NewStatus.md#request)
 */
declare class NewStatus extends Command {
    constructor();
    static readonly id = 20;
    static readonly directionType = 1;
    static readonly title = "NEW_STATUS";
    static fromBytes(): NewStatus;
    toBytes(): Uint8Array;
}
export default NewStatus;
