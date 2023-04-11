import Command from '../../Command.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x19;
const COMMAND_TITLE = 'SOFT_RESTART';
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
class SoftRestart extends Command {
    // data - only body (without header)
    static fromBytes() {
        return new SoftRestart();
    }
    // eslint-disable-next-line class-methods-use-this
    toBytes() {
        return Command.toBytes(COMMAND_ID);
    }
}
SoftRestart.id = COMMAND_ID;
SoftRestart.directionType = DIRECTION_TYPE_UPLINK;
SoftRestart.title = COMMAND_TITLE;
export default SoftRestart;
//# sourceMappingURL=SoftRestart.js.map