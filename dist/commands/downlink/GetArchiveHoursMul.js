/**
 * [[include:commands/downlink/GetArchiveHoursMul.md]]
 *
 * @packageDocumentation
 */
import Command from '../../Command.js';
import CommandBinaryBuffer from '../../CommandBinaryBuffer.js';
import { DIRECTION_TYPE_DOWNLINK } from '../../constants/directionTypes.js';
import { getSecondsFromDate, getDateFromSeconds } from '../../utils/time.js';
const COMMAND_ID = 0x1a;
const COMMAND_TITLE = 'GET_ARCHIVE_HOURS_MUL';
const COMMAND_BODY_SIZE = 4;
/**
 * Downlink command.
 *
 * @example
 * ```js
 * import GetArchiveHoursMul from 'jooby-codec/commands/downlink/GetArchiveHoursMul';
 *
 * const parameters = {channels: [0], hourAmount: 0, time: 756648000};
 * const command = new GetArchiveHoursMul(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 1a 04 2f 97 0c 01
 * ```
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/GetArchiveHoursMul.md#request)
 */
class GetArchiveHoursMul extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
        this.parameters.channels = this.parameters.channels.sort((a, b) => a - b);
    }
    // data - only body (without header)
    static fromBytes(data) {
        if (data.byteLength !== COMMAND_BODY_SIZE) {
            throw new Error(`${this.getName()}. Wrong buffer size: ${data.byteLength}.`);
        }
        const buffer = new CommandBinaryBuffer(data);
        const date = buffer.getDate();
        const { hour, hours: hourAmount } = buffer.getHours();
        const channels = buffer.getChannels(true);
        date.setUTCHours(hour);
        if (!buffer.isEmpty) {
            throw new Error(`${this.getName()}. BinaryBuffer is not empty.`);
        }
        return new GetArchiveHoursMul({ channels, hourAmount, time: getSecondsFromDate(date) });
    }
    // returns full message - header with body
    toBytes() {
        const { channels, hourAmount, time } = this.parameters;
        const buffer = new CommandBinaryBuffer(COMMAND_BODY_SIZE);
        const date = getDateFromSeconds(time);
        const hour = date.getUTCHours();
        buffer.setDate(date);
        buffer.setHours(hour, hourAmount);
        buffer.setChannels(channels);
        return Command.toBytes(COMMAND_ID, buffer.toUint8Array());
    }
}
GetArchiveHoursMul.id = COMMAND_ID;
GetArchiveHoursMul.directionType = DIRECTION_TYPE_DOWNLINK;
GetArchiveHoursMul.title = COMMAND_TITLE;
export default GetArchiveHoursMul;
//# sourceMappingURL=GetArchiveHoursMul.js.map