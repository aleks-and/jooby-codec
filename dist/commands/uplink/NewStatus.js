import Command from '../../Command.js';
import CommandBinaryBuffer from '../../CommandBinaryBuffer.js';
import roundNumber from '../../utils/roundNumber.js';
import * as hardwareTypes from '../../constants/hardwareTypes.js';
import { DIRECTION_TYPE_UPLINK } from '../../constants/directionTypes.js';
const COMMAND_ID = 0x14;
const COMMAND_TITLE = 'NEW_STATUS';
const COMMAND_BODY_MAX_SIZE = 20;
const UNKNOWN_RESISTANT = 65535;
// max battery capacity, 254 - 100%
const UNKNOWN_BATTERY_CAPACITY = 255;
/**
 * Uplink command.
 *
 * @example
 * ```js
 * import NewStatus from 'jooby-codec/commands/uplink/NewStatus';
 *
 * const parameters = {
 *     software: {type: 4, version: 10},
 *     hardware: {type: 1, version: 1},
 *     data: {
 *         voltage: {
 *             low: 63,
 *             high: 144
 *         },
 *         internalResistance: 10034,
 *         temperature: 14,
 *         remindedBatteryCapacity: 41,
 *         lastEventSequenceNumber: 34
 *     }
 * };
 *
 * const command = new NewStatus(parameters);
 *
 * // output command binary in hex representation
 * console.log(command.toHex());
 * // 14 0c 04 0a 01 01 03 f0 90 27 32 0e 68 22
 * ```
 *
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/commands/NewStatus.md#response)
 */
class NewStatus extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    static fromBytes(data) {
        const buffer = new CommandBinaryBuffer(data);
        const software = { type: buffer.getUint8(), version: buffer.getUint8() };
        const hardware = { type: buffer.getUint8(), version: buffer.getUint8() };
        let statusData;
        switch (hardware.type) {
            case hardwareTypes.GAZM3:
            case hardwareTypes.GAZM0:
            case hardwareTypes.GAZM0NEW:
            case hardwareTypes.NOVATOR:
            case hardwareTypes.IMP2EU:
            case hardwareTypes.IMP4EU:
            case hardwareTypes.IMP2AS:
            case hardwareTypes.IMP2IN:
            case hardwareTypes.IMP4IN:
            case hardwareTypes.GAZWLE:
            case hardwareTypes.WATER:
            case hardwareTypes.PLC2LORA:
                statusData = {
                    voltage: buffer.getBatterVoltage(),
                    internalResistance: buffer.getUint16(false),
                    temperature: buffer.getUint8(),
                    remindedBatteryCapacity: buffer.getUint8(),
                    lastEventSequenceNumber: buffer.getUint8()
                };
                if (statusData.internalResistance === UNKNOWN_RESISTANT) {
                    statusData.internalResistance = undefined;
                }
                if (statusData.remindedBatteryCapacity === UNKNOWN_BATTERY_CAPACITY) {
                    statusData.remindedBatteryCapacity = undefined;
                }
                else if (statusData.remindedBatteryCapacity !== undefined) {
                    statusData.remindedBatteryCapacity = roundNumber((statusData.remindedBatteryCapacity * 100) / (UNKNOWN_BATTERY_CAPACITY - 1), 0);
                }
                break;
            case hardwareTypes.MTXLORA:
            case hardwareTypes.ELIMP:
            default:
                throw new Error(`${this.getId()}: hardware type ${hardware.type} is not supported`);
        }
        return new NewStatus({ software, hardware, data: statusData });
    }
    toBytes() {
        const { software, hardware, data } = this.parameters;
        const buffer = new CommandBinaryBuffer(COMMAND_BODY_MAX_SIZE);
        let statusData;
        buffer.setUint8(software.type);
        buffer.setUint8(software.version);
        buffer.setUint8(hardware.type);
        buffer.setUint8(hardware.version);
        switch (hardware.type) {
            case hardwareTypes.GAZM3:
            case hardwareTypes.GAZM0:
            case hardwareTypes.GAZM0NEW:
            case hardwareTypes.NOVATOR:
            case hardwareTypes.IMP2EU:
            case hardwareTypes.IMP4EU:
            case hardwareTypes.IMP2AS:
            case hardwareTypes.IMP2IN:
            case hardwareTypes.IMP4IN:
            case hardwareTypes.GAZWLE:
            case hardwareTypes.WATER:
            case hardwareTypes.PLC2LORA:
                statusData = data;
                buffer.setBatterVoltage(statusData.voltage);
                if (statusData.internalResistance === undefined) {
                    buffer.setUint16(UNKNOWN_RESISTANT, false);
                }
                else {
                    buffer.setUint16(statusData.internalResistance, false);
                }
                buffer.setUint8(statusData.temperature);
                if (statusData.remindedBatteryCapacity === undefined) {
                    buffer.setUint8(UNKNOWN_BATTERY_CAPACITY);
                }
                else {
                    buffer.setUint8((UNKNOWN_BATTERY_CAPACITY - 1) * (statusData.remindedBatteryCapacity / 100));
                }
                buffer.setUint8(statusData.lastEventSequenceNumber);
                break;
            case hardwareTypes.MTXLORA:
            case hardwareTypes.ELIMP:
            default:
                throw new Error(`${NewStatus.getId()}: hardware type ${hardware.type} is not supported`);
        }
        return Command.toBytes(COMMAND_ID, buffer.getBytesToOffset());
    }
}
NewStatus.id = COMMAND_ID;
NewStatus.directionType = DIRECTION_TYPE_UPLINK;
NewStatus.title = COMMAND_TITLE;
export default NewStatus;
//# sourceMappingURL=NewStatus.js.map