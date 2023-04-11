import GetCurrentMul from './GetCurrentMul.js';
import { IChannel } from '../../CommandBinaryBuffer.js';
/**
 * GetArchiveHoursMul command parameters
 *
 * @example
 * // archive hours values from 001-03-10T12:00:00.000Z with 1-hour diff
 * {
 *     channels: [{value: 101, index: 0, diff: [value: 1]}],
 *     date: '2001-03-10T12:00:00.000Z',
 *     hourAmount: 1
 * }
 */
interface IUplinkGetArchiveHoursMulParameters {
    channels: Array<IChannel>;
    date: Date | undefined | string;
    hourAmount: number | undefined;
}
declare class GetArchiveHoursMul extends GetCurrentMul {
    parameters: IUplinkGetArchiveHoursMulParameters;
    constructor(parameters: IUplinkGetArchiveHoursMulParameters);
    static readonly id = 26;
    static readonly directionType = 2;
    static readonly title = "GET_ARCHIVE_HOURS_MUL";
    static fromBytes(data: Uint8Array): GetArchiveHoursMul;
    toBytes(): Uint8Array;
}
export default GetArchiveHoursMul;
