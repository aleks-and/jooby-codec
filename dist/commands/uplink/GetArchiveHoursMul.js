import Command from '../../Command.js';
import GetCurrentMul from './GetCurrentMul.js';
import CommandBinaryBuffer from '../../CommandBinaryBuffer.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
import { getDateFromSeconds } from '../../utils/time.js';
const COMMAND_ID = 0x1a;
const COMMAND_TITLE = 'GET_ARCHIVE_HOURS_MUL';
// date 2 bytes, hour 1 byte, channels - 1 byte, so max channels = 4
// max hours diff - 7 (3 bit value)
// 4 + (4 channels * 5 bytes of hour values) + (4 * 5 bytes of diff * 7 max hours diff)
const COMMAND_BODY_MAX_SIZE = 164;
class GetArchiveHoursMul extends GetCurrentMul {
    constructor(parameters) {
        super(parameters);
        this.parameters = parameters;
        const { date, hourAmount, channels } = this.parameters;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (date === undefined) {
            const [{ time }] = channels;
            if (time) {
                this.parameters.date = getDateFromSeconds(time);
            }
            else {
                throw new Error(`${GetArchiveHoursMul.getName()} can't recognize time`);
            }
        }
        else if (typeof date === 'string') {
            this.parameters.date = new Date(date);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (hourAmount === undefined) {
            this.parameters.hourAmount = channels[0].diff.length;
        }
    }
    static fromBytes(data) {
        const buffer = new CommandBinaryBuffer(data);
        return new GetArchiveHoursMul(buffer.getChannelsValuesWithHourDiff());
    }
    toBytes() {
        const buffer = new CommandBinaryBuffer(COMMAND_BODY_MAX_SIZE);
        const { hourAmount, date, channels } = this.parameters;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        buffer.setChannelsValuesWithHourDiff(hourAmount, date, channels);
        return Command.toBytes(COMMAND_ID, buffer.getBytesToOffset());
    }
}
GetArchiveHoursMul.id = COMMAND_ID;
GetArchiveHoursMul.directionType = DIRECTION_TYPE_UPLINK;
GetArchiveHoursMul.title = COMMAND_TITLE;
export default GetArchiveHoursMul;
//# sourceMappingURL=GetArchiveHoursMul.js.map