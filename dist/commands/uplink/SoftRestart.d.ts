import Command from '../../Command.js';
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import SoftRestart from 'jooby-codec/commands/uplink/SoftRestart';
 *
 * const command = new SoftRestart();
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 19 00
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/SoftRestart.md#response)
 */
declare class SoftRestart extends Command {
    static readonly id = 25;
    static readonly directionType = 2;
    static readonly title = "SOFT_RESTART";
    static fromBytes(): SoftRestart;
    toBytes(): Uint8Array;
}
export default SoftRestart;
