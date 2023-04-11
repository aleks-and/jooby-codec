import GetCurrentMul from './GetCurrentMul.js';
declare class DataHourMul extends GetCurrentMul {
    parameters: any;
    constructor(parameters: any);
    static readonly id = 23;
    static readonly directionType = 2;
    static readonly title = "DATA_HOUR_MUL";
    static fromBytes(data: Uint8Array): any;
    toBytes(): Uint8Array;
}
export default DataHourMul;
