import Command from '../../Command.js';
import CommandBinaryBuffer from '../../CommandBinaryBuffer.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x18;
const COMMAND_TITLE = 'GET_CURRENT_MUL';
// 2 bytes for 7 channels + (7 channels * 5 byte for current value of channel)
const COMMAND_BODY_MAX_SIZE = 37;
class GetCurrentMul extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
        this.parameters.channels = this.parameters.channels.sort((a, b) => a.index - b.index);
    }
    static fromBytes(data) {
        const parameters = { channels: [] };
        const buffer = new CommandBinaryBuffer(data);
        const channels = buffer.getChannels(false);
        parameters.channels = channels.map(channelIndex => ({
            value: buffer.getExtendedValue(),
            index: channelIndex
        }));
        return new GetCurrentMul(parameters);
    }
    toBytes() {
        const buffer = new CommandBinaryBuffer(COMMAND_BODY_MAX_SIZE);
        const { channels } = this.parameters;
        buffer.setChannels(channels.map(({ index }) => index));
        channels.forEach(({ value }) => buffer.setExtendedValue(value));
        return Command.toBytes(COMMAND_ID, buffer.getBytesToOffset());
    }
}
GetCurrentMul.id = COMMAND_ID;
GetCurrentMul.directionType = DIRECTION_TYPE_UPLINK;
GetCurrentMul.title = COMMAND_TITLE;
export default GetCurrentMul;
//# sourceMappingURL=GetCurrentMul.js.map