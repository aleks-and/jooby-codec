import Command from '../../Command.js';
import CommandBinaryBuffer from '../../CommandBinaryBuffer.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x09;
const COMMAND_TITLE = 'TIME_2000';
const COMMAND_BODY_SIZE = 5;
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
class Time2000 extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    // data - only body (without header)
    static fromBytes(data) {
        if (data.byteLength !== COMMAND_BODY_SIZE) {
            throw new Error(`${this.getName()}. Wrong buffer size: ${data.byteLength}.`);
        }
        const buffer = new CommandBinaryBuffer(data);
        const parameters = {
            sequenceNumber: buffer.getUint8(),
            time: buffer.getTime()
        };
        if (!buffer.isEmpty) {
            throw new Error(`${this.getName()}. BinaryBuffer is not empty.`);
        }
        return new Time2000(parameters);
    }
    // returns full message - header with body
    toBytes() {
        const { sequenceNumber, time } = this.parameters;
        const buffer = new CommandBinaryBuffer(COMMAND_BODY_SIZE);
        buffer.setUint8(sequenceNumber);
        buffer.setTime(time);
        return Command.toBytes(COMMAND_ID, buffer.toUint8Array());
    }
}
Time2000.id = COMMAND_ID;
Time2000.directionType = DIRECTION_TYPE_UPLINK;
Time2000.title = COMMAND_TITLE;
export default Time2000;
//# sourceMappingURL=Time2000.js.map