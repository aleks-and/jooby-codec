import GetCurrentMul from './GetCurrentMul.js';
declare class ExAbsDayMul extends GetCurrentMul {
    parameters: any;
    constructor(parameters: any);
    static id: number;
    static readonly directionType = 2;
    static title: string;
    static fromBytes(data: Uint8Array): any;
    toBytes(): Uint8Array;
}
export default ExAbsDayMul;
