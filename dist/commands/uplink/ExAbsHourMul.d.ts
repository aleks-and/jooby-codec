import GetCurrentMul from './GetCurrentMul.js';
declare class ExAbsHourMul extends GetCurrentMul {
    parameters: any;
    constructor(parameters: any);
    static readonly id = 2591;
    static readonly directionType = 2;
    static readonly title = "EX_ABS_HOUR_MUL";
    static fromBytes(data: Uint8Array): any;
    toBytes(): Uint8Array;
}
export default ExAbsHourMul;
