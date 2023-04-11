import Command from '../../Command.js';
import CommandBinaryBuffer from '../../CommandBinaryBuffer.js';
import getHexFromBytes from '../../utils/getHexFromBytes.js';
import getBytesFromHex from '../../utils/getBytesFromHex.js';
import * as events from '../../constants/events.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x15;
const COMMAND_TITLE = 'NEW_EVENT';
// ACTIVATE_MTX are biggest,1 byte event id, 1 byte sequence number, 4 bytes time, 8 bytes mtx address
const COMMAND_BODY_MAX_SIZE = 14;
const MTX_ADDRESS_SIZE = 8;
const getVoltage = (buffer) => buffer.getUint16(false);
const setVoltage = (buffer, value) => buffer.setUint16(value, false);
const getDeviceId = (buffer) => {
    const bytes = [];
    for (let i = 0; i < MTX_ADDRESS_SIZE; ++i) {
        bytes.push(buffer.getUint8());
    }
    return getHexFromBytes(new Uint8Array(bytes));
};
const setDeviceId = (buffer, value) => {
    const bytes = getBytesFromHex(value);
    bytes.forEach(byte => buffer.setUint8(byte));
};
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import {constants} from 'jooby-codec'
 * import NewEvent from 'jooby-codec/commands/uplink/NewEvent';
 *
 * // `Magnet On` event at 2023-04-05 13:17:20 GMT
 * const parameters = {id: constants.events.MAGNET_ON, sequenceNumber: 3, data: {time: 734015840}}
 * const command = new NewEvent(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 15 06 01 03 2b c0 31 60
 * ```
 *
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/uplink/NewEvent.md)
 */
class NewEvent extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    static fromBytes(data) {
        const buffer = new CommandBinaryBuffer(data);
        const id = buffer.getUint8();
        const sequenceNumber = buffer.getUint8();
        let eventData;
        switch (id) {
            case events.MAGNET_ON:
            case events.MAGNET_OFF:
            case events.ACTIVATE:
            case events.DEACTIVATE:
            case events.CAN_OFF:
            case events.INSERT:
            case events.REMOVE:
            case events.COUNTER_OVER:
            case events.EV_OPTOLOW:
            case events.EV_OPTOFLASH:
            case events.EV_REJOIN:
                eventData = { time: buffer.getTime() };
                break;
            case events.BATTERY_ALARM:
                eventData = { voltage: getVoltage(buffer) };
                break;
            case events.ACTIVATE_MTX:
                eventData = { time: buffer.getTime(), deviceId: getDeviceId(buffer) };
                break;
            case events.CONNECT:
            case events.DISCONNECT:
                eventData = { channel: buffer.getUint8(), value: buffer.getExtendedValue() };
                break;
            case events.EV_MTX:
                eventData = { status1: buffer.getUint8(), status2: buffer.getUint8() };
                break;
            default:
                throw new Error(`${this.getId()}: event ${id} is not supported`);
        }
        return new NewEvent({ id, sequenceNumber, data: eventData });
    }
    toBytes() {
        const { id, sequenceNumber, data } = this.parameters;
        const buffer = new CommandBinaryBuffer(COMMAND_BODY_MAX_SIZE);
        let eventData;
        buffer.setUint8(id);
        buffer.setUint8(sequenceNumber);
        switch (id) {
            case events.MAGNET_ON:
            case events.MAGNET_OFF:
            case events.ACTIVATE:
            case events.DEACTIVATE:
            case events.CAN_OFF:
            case events.INSERT:
            case events.REMOVE:
            case events.COUNTER_OVER:
            case events.EV_OPTOLOW:
            case events.EV_OPTOFLASH:
            case events.EV_REJOIN:
                eventData = data;
                buffer.setTime(eventData.time);
                break;
            case events.BATTERY_ALARM:
                eventData = data;
                setVoltage(buffer, eventData.voltage);
                break;
            case events.ACTIVATE_MTX:
                eventData = data;
                buffer.setTime(eventData.time);
                setDeviceId(buffer, eventData.deviceId);
                break;
            case events.CONNECT:
            case events.DISCONNECT:
                eventData = data;
                buffer.setUint8(eventData.channel);
                buffer.setExtendedValue(eventData.value);
                break;
            case events.EV_MTX:
                eventData = data;
                buffer.setUint8(eventData.status1);
                buffer.setUint8(eventData.status2);
                break;
            default:
                throw new Error(`${NewEvent.getId()}: event ${id} is not supported`);
        }
        return Command.toBytes(COMMAND_ID, buffer.getBytesToOffset());
    }
}
NewEvent.id = COMMAND_ID;
NewEvent.directionType = DIRECTION_TYPE_UPLINK;
NewEvent.title = COMMAND_TITLE;
export default NewEvent;
//# sourceMappingURL=NewEvent.js.map