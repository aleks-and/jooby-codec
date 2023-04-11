import getBytesFromHex from './utils/getBytesFromHex.js';
import getHexFromBytes from './utils/getHexFromBytes.js';
// bytes amount
const INT8_SIZE = 1;
const INT16_SIZE = 2;
const INT32_SIZE = 4;
const createView = (buffer, numberSize) => {
    if (buffer.offset + numberSize > buffer.data.byteLength) {
        throw new Error('Invalid buffer size.');
    }
    return new DataView(buffer.data, buffer.offset, numberSize);
};
/**
 * Byte array manipulation.
 */
class BinaryBuffer {
    /**
     * Create a buffer stream.
     *
     * @param data - the instance of Uint8Array or ArrayBuffer size
     * @param isLittleEndian - if true then little endian will be used, big endian otherwise
     */
    constructor(dataOrLength, isLittleEndian = true) {
        if (typeof dataOrLength === 'number') {
            this.data = new ArrayBuffer(dataOrLength);
        }
        else if (typeof dataOrLength === 'string') {
            this.data = getBytesFromHex(dataOrLength).buffer;
        }
        else {
            this.data = dataOrLength.buffer;
        }
        this.offset = 0;
        this.isLittleEndian = isLittleEndian;
    }
    toHex(options = {}) {
        return getHexFromBytes(this.toUint8Array(), options);
    }
    toUint8Array() {
        return new Uint8Array(this.data);
    }
    get size() {
        return this.data.byteLength;
    }
    get isEmpty() {
        return this.data.byteLength - this.offset === 0;
    }
    get bytesLeft() {
        return this.data.byteLength - this.offset;
    }
    get position() {
        return this.offset;
    }
    seek(position) {
        if (position < 0 || position >= this.data.byteLength) {
            throw new Error('Invalid position.');
        }
        this.offset = position;
    }
    setInt8(value) {
        const view = createView(this, INT8_SIZE);
        view.setInt8(0, value);
        this.offset += INT8_SIZE;
    }
    getInt8() {
        const result = createView(this, INT8_SIZE).getInt8(0);
        this.offset += INT8_SIZE;
        return result;
    }
    setUint8(value) {
        createView(this, INT8_SIZE).setUint8(0, value);
        this.offset += INT8_SIZE;
    }
    getUint8() {
        const result = createView(this, INT8_SIZE).getUint8(0);
        this.offset += INT8_SIZE;
        return result;
    }
    setInt16(number, isLittleEndian = this.isLittleEndian) {
        createView(this, INT16_SIZE).setInt16(0, number, isLittleEndian);
        this.offset += INT16_SIZE;
    }
    getInt16(isLittleEndian = this.isLittleEndian) {
        const result = createView(this, INT16_SIZE).getInt16(0, isLittleEndian);
        this.offset += INT16_SIZE;
        return result;
    }
    setUint16(value, isLittleEndian = this.isLittleEndian) {
        createView(this, INT16_SIZE).setUint16(0, value, isLittleEndian);
        this.offset += INT16_SIZE;
    }
    getUint16(isLittleEndian = this.isLittleEndian) {
        const result = createView(this, INT16_SIZE).getUint16(0, isLittleEndian);
        this.offset += INT16_SIZE;
        return result;
    }
    setInt32(value, isLittleEndian = this.isLittleEndian) {
        createView(this, INT32_SIZE).setInt32(0, value, isLittleEndian);
        this.offset += INT32_SIZE;
    }
    getInt32(isLittleEndian = this.isLittleEndian) {
        const result = createView(this, INT32_SIZE).getInt32(0, isLittleEndian);
        this.offset += INT32_SIZE;
        return result;
    }
    setUint32(value, isLittleEndian = this.isLittleEndian) {
        createView(this, INT32_SIZE).setUint32(0, value, isLittleEndian);
        this.offset += INT32_SIZE;
    }
    getUint32(isLittleEndian = this.isLittleEndian) {
        const result = createView(this, INT32_SIZE).getUint32(0, isLittleEndian);
        this.offset += INT32_SIZE;
        return result;
    }
    /**
     * Get bytes from start to offset.
     *
     * @param offset - current offset by default
     *
     * @returns sliced byte array
     */
    getBytesToOffset(offset = this.offset) {
        const bytes = this.toUint8Array();
        return bytes.slice(0, offset);
    }
}
export default BinaryBuffer;
//# sourceMappingURL=BinaryBuffer.js.map