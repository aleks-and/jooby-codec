/**
 * [[include:commands/downlink/GetArchiveHoursMul.md]]
 *
 * @packageDocumentation
 */
import Command from '../../Command.js';
import { Seconds } from '../../CommandBinaryBuffer.js';
/**
 * GetArchiveHoursMul command parameters
 *
 * @example
 * // request for 2 hours archive values from channel #1 from 2023-12-23T12:00:00.000Z or 756648000 seconds since 2000 year
 * {channels: [0], hourAmount: 2, time: 756648000}
 */
interface IDownlinkGetArchiveHoursMulParameters {
    /** amount of hours to retrieve */
    hourAmount: number;
    time: Seconds;
    /** array of channels indexes */
    channels: Array<number>;
}
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
declare class GetArchiveHoursMul extends Command {
    parameters: IDownlinkGetArchiveHoursMulParameters;
    constructor(parameters: IDownlinkGetArchiveHoursMulParameters);
    static readonly id = 26;
    static readonly directionType = 1;
    static readonly title = "GET_ARCHIVE_HOURS_MUL";
    static fromBytes(data: Uint8Array): GetArchiveHoursMul;
    toBytes(): Uint8Array;
}
export default GetArchiveHoursMul;
