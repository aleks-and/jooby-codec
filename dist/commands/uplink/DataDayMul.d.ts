import GetCurrentMul, { IGetCurrentMulParameters } from './GetCurrentMul.js';
/**
 * DataDayMul command parameters.
 */
interface IDataDayMulParameters extends IGetCurrentMulParameters {
    /**
     * Seconds since year 2000, i.e. timestamp (in seconds) - 946684800
     */
    time: number;
}
declare class DataDayMul extends GetCurrentMul {
    parameters: IDataDayMulParameters;
    constructor(parameters: IDataDayMulParameters);
    static readonly id = 22;
    static readonly directionType = 2;
    static readonly title = "DATA_DAY_MUL";
    static fromBytes(data: Uint8Array): DataDayMul;
    toBytes(): Uint8Array;
}
export default DataDayMul;
