/**
 * Get array with binary representation of number as char.
 *
 * @example
 * ```js
 * const value = 221;
 * const bitArray = getBitArrayFromNumber(value);
 * console.log(bitArray); // print ['1', '1', '0', '1', '1', '1', '0', '1']
 * ```
 *
 * @returns ['0', '1', '1'] like string padded with '0' to specific size or byte length (8) by default
 */
declare const _default: (value: number, size?: number) => Array<string>;
export default _default;
