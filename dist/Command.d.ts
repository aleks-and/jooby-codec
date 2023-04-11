import { IHexFormatOptions } from './utils/getHexFromBytes.js';
/**
 * private
 */
declare class Command {
    static id: number;
    static directionType: unknown;
    static title: string;
    parameters: unknown;
    /** Get command ID in hex format. */
    static getId(): string;
    /** Get command ID and title. */
    static getName(): string;
    /**
     * Parse header with body.
     * Should not be used directly, only from Command child.
     *
     * @param data command in binary form
     * @param commandsById
     *
     * @returns command instance
     */
    /**
     * Build header with body.
     *
     * @param id command id
     * @param commandData optional command binary data
     * @returns merged data
     */
    static toBytes(id: number, commandData?: Uint8Array): Uint8Array;
    /** Get command parameters. */
    getParameters(): unknown;
    toBytes(): Uint8Array;
    toHex(options?: IHexFormatOptions): string;
    /**
     * Returns the command in JSON format.
     *
     * @returns JSON string contains current parameters
     */
    toJson(): string;
}
export default Command;
