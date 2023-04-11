const defaultHexFormatOptions = {
    separator: ' ',
    prefix: ''
};
/**
 * Convert byte array to hex string.
 *
 * @param buffer - input data to convert
 * @param options - formatting parameters
 *
 * @example
 * input: [2, 5, 12, 255, 105, 139, 125]
 * output: '02 05 0c ff 69 8b 7d' or '0x02 0x05 0x0c 0xff 0x69 0x8b 0x7d'
 */
export default (buffer, options = {}) => {
    const { separator, prefix } = { ...defaultHexFormatOptions, ...options };
    return [...buffer]
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .map((byte) => `${prefix}${byte.toString(16).padStart(2, '0')}`)
        .join(separator);
};
//# sourceMappingURL=getHexFromBytes.js.map