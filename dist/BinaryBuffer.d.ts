import { IHexFormatOptions } from './utils/getHexFromBytes.js';
/**
 * Byte array manipulation.
 */
declare class BinaryBuffer {
    data: ArrayBuffer;
    offset: number;
    isLittleEndian: boolean;
    /**
     * Create a buffer stream.
     *
     * @param data - the instance of Uint8Array or ArrayBuffer size
     * @param isLittleEndian - if true then little endian will be used, big endian otherwise
     */
    constructor(dataOrLength: Uint8Array | number | string, isLittleEndian?: boolean);
    toHex(options?: IHexFormatOptions): string;
    toUint8Array(): Uint8Array;
    get size(): number;
    get isEmpty(): boolean;
    get bytesLeft(): number;
    get position(): number;
    seek(position: number): void;
    setInt8(value: number): void;
    getInt8(): number;
    setUint8(value: number): void;
    getUint8(): number;
    setInt16(number: number, isLittleEndian?: boolean): void;
    getInt16(isLittleEndian?: boolean): number;
    setUint16(value: number, isLittleEndian?: boolean): void;
    getUint16(isLittleEndian?: boolean): number;
    setInt32(value: number, isLittleEndian?: boolean): void;
    getInt32(isLittleEndian?: boolean): number;
    setUint32(value: number, isLittleEndian?: boolean): void;
    getUint32(isLittleEndian?: boolean): number;
    /**
     * Get bytes from start to offset.
     *
     * @param offset - current offset by default
     *
     * @returns sliced byte array
     */
    getBytesToOffset(offset?: number): Uint8Array;
}
export default BinaryBuffer;
