import Command from '../../Command.js';
interface IStatusBase {
}
interface IProduct {
    version: number;
    type: number;
}
/**
 * NewStatus command parameters
 */
interface INewStatusParameters {
    software: IProduct;
    hardware: IProduct;
    data: IStatusBase;
}
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
declare class NewStatus extends Command {
    parameters: INewStatusParameters;
    constructor(parameters: INewStatusParameters);
    static readonly id = 20;
    static readonly directionType = 2;
    static readonly title = "NEW_STATUS";
    static fromBytes(data: Uint8Array): NewStatus;
    toBytes(): Uint8Array;
}
export default NewStatus;
