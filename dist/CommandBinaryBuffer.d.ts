import BinaryBuffer from './BinaryBuffer.js';
/**
 * Time from UTC 2000-01-01 00:00:00 in seconds.
 */
export type Seconds = number;
export interface IBatteryVoltage {
    /**
     * battery voltage value at low consumption, in mV;
     *
     * 4095 === undefined
     */
    low: number | undefined;
    /**
     * battery voltage value at hight consumption, in mV;
     *
     * 4095 === undefined
     */
    high: number | undefined;
}
/**
 * Hour channel
 */
export interface IHourDiff {
    value: number;
    hour: number;
    time: Seconds;
    date: Date;
}
export interface IChannel {
    /**
     * Channel number.
     */
    index: number;
    /**
     * Pulse counter or absolute value of device channel.
     */
    value: number;
    /**
     * Values differences between hours.
     */
    diff: Array<IHourDiff>;
    /**
     * Value time.
     */
    time: Seconds | undefined;
    /**
     * Normal date in UTC.
     */
    date: Date | undefined;
}
/**
 * Command specific byte array manipulation.
 */
declare class CommandBinaryBuffer extends BinaryBuffer {
    getExtendedValue(): number;
    setExtendedValue(value: number): void;
    /**
     * Get array of channel indexes.
     *
     * @param short - get 4 channels or more
     */
    getChannels(short: boolean): Array<number>;
    /**
     * Set array of channel indexes.
     *
     */
    setChannels(channels: Array<any>): void;
    /**
     * Retrieve device time from byte array.
     *
     * @example
     * ['00101111', '10010111'] -> [47, 151] will be '2023-12-23'
     *
     * @returns Date object instance
     */
    getDate(): Date;
    /**
     * Convert date or seconds to bytes.
     * '2023-12-23' will be 0010111-1100-10111, so bytes: ['00101111', '10010111'] -> [47, 151]
     */
    setDate(dateOrTime: Date | number): void;
    /**
     * Retrieve device time from byte array.
     *
     * @example
     * 0xb8 = 0b10111000 will be {hours: 0b101, hour: 0b11000} i.e. {hours: 5, hour: 24}
     */
    getHours(): {
        hours: number;
        hour: number;
    };
    setHours(hour: number, hours: number): void;
    getTime(): number;
    setTime(value: number): void;
    getBatterVoltage(): IBatteryVoltage;
    setBatterVoltage(batteryVoltage: IBatteryVoltage): void;
    getChannelsValuesWithHourDiff(): {
        hourAmount: number;
        channels: Array<IChannel>;
        date: Date;
    };
    setChannelsValuesWithHourDiff(hourAmount: number, date: Date, channels: Array<IChannel>): void;
}
export default CommandBinaryBuffer;
