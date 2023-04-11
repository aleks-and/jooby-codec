/**
 * [[include:commands/downlink/SetTime2000.md]]
 *
 * @packageDocumentation
 */
import Command from '../../Command.js';
import BinaryBuffer from '../../BinaryBuffer.js';
import { DIRECTION_TYPE_DOWNLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x02;
const COMMAND_TITLE = 'SET_TIME_2000';
const COMMAND_BODY_SIZE = 5;
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
            sequenceNumber: buffer.getUint8(),
            time: buffer.getInt32()
        };
        if (!buffer.isEmpty) {
            throw new Error(`${this.getName()}. BinaryBuffer is not empty.`);
        }
        return new SetTime2000(parameters);
    }
    // returns full message - header with body
    toBytes() {
        const { sequenceNumber, time } = this.parameters;
        const buffer = new BinaryBuffer(COMMAND_BODY_SIZE, false);
        buffer.setUint8(sequenceNumber);
        buffer.setInt32(time);
        return Command.toBytes(COMMAND_ID, buffer.toUint8Array());
    }
}
SetTime2000.id = COMMAND_ID;
SetTime2000.directionType = DIRECTION_TYPE_DOWNLINK;
SetTime2000.title = COMMAND_TITLE;
export default SetTime2000;
//# sourceMappingURL=SetTime2000.js.map