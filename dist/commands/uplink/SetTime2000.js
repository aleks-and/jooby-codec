import Command from '../../Command.js';
import BinaryBuffer from '../../BinaryBuffer.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x02;
const COMMAND_TITLE = 'SET_TIME_2000';
const COMMAND_BODY_SIZE = 1;
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
class SetTime2000 extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    // data - only body (without header)
    static fromBytes(data) {
        if (data.byteLength !== COMMAND_BODY_SIZE) {
            throw new Error(`${this.getName()}. Wrong buffer size: ${data.byteLength}.`);
        }
        const buffer = new BinaryBuffer(data, false);
        const parameters = {
            status: buffer.getUint8()
        };
        if (!buffer.isEmpty) {
            throw new Error(`${this.getName()}. BinaryBuffer is not empty.`);
        }
        return new SetTime2000(parameters);
    }
    toBytes() {
        const { status } = this.parameters;
        const buffer = new BinaryBuffer(COMMAND_BODY_SIZE, false);
        buffer.setUint8(status);
        return Command.toBytes(COMMAND_ID, buffer.toUint8Array());
    }
}
SetTime2000.id = COMMAND_ID;
SetTime2000.directionType = DIRECTION_TYPE_UPLINK;
SetTime2000.title = COMMAND_TITLE;
export default SetTime2000;
//# sourceMappingURL=SetTime2000.js.map