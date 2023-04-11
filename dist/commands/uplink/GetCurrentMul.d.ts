import Command from '../../Command.js';
/**
 * GetCurrentMul command channel.
 */
export interface IChannel {
    index: number;
    value: number;
}
/**
 * GetCurrentMul command parameters.
 */
export interface IGetCurrentMulParameters {
    channels: Array<IChannel>;
}
declare class GetCurrentMul extends Command {
    parameters: IGetCurrentMulParameters;
    constructor(parameters: IGetCurrentMulParameters);
    static id: number;
    static readonly directionType = 2;
    static title: string;
    static fromBytes(data: Uint8Array): GetCurrentMul;
    toBytes(): Uint8Array;
}
export default GetCurrentMul;
