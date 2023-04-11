import Command from '../../Command.js';
import BinaryBuffer from '../../BinaryBuffer.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x0c;
const COMMAND_TITLE = 'CORRECT_TIME_2000';
const COMMAND_BODY_SIZE = 1;
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
class CorrectTime2000 extends Command {
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
        return new CorrectTime2000(parameters);
    }
    toBytes() {
        const { status } = this.parameters;
        const buffer = new BinaryBuffer(COMMAND_BODY_SIZE, false);
        buffer.setUint8(status);
        return Command.toBytes(COMMAND_ID, buffer.toUint8Array());
    }
}
CorrectTime2000.id = COMMAND_ID;
CorrectTime2000.directionType = DIRECTION_TYPE_UPLINK;
CorrectTime2000.title = COMMAND_TITLE;
export default CorrectTime2000;
//# sourceMappingURL=CorrectTime2000.js.map