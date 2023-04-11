/**
 * Convert hex string to byte array.
 *
 * @param hex - input bytes hex representation
 *
 * @example
 * input: '02 05 0c ff 69 8b 7d' or '02050cff698b7d' or ' 0x23 0xaa 0x00'
 * output: [2, 5, 12, 255, 105, 139, 125]
 */
declare const _default: (hex: string) => Uint8Array;
export default _default;
