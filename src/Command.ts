import * as header from './utils/header.js';
import getHexFromBytes, {IHexFormatOptions} from './utils/getHexFromBytes.js';
import {DIRECTION_TYPE_UPLINK} from './constants/directionTypes.js';


/**
 * private
 */
class Command {
    static id: number;

    static directionType: unknown;

    static title: string;

    parameters: unknown;

    /** Get command ID in hex format. */
    static getId () {
        return `0x${this.id.toString(16).padStart(2, '0')}`;
    }

    /** Get command ID and title. */
    static getName () {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return `${this.directionType === DIRECTION_TYPE_UPLINK ? 'uplink' : 'downlink'} command ${this.getId()}:${this.title}`;
    }


    /**
     * Parse header with body.
     * Should not be used directly, only from Command child.
     *
     * @param data command in binary form
     * @param commandsById
     *
     * @returns command instance
     */
    // static fromBytes ( data: Uint8Array, commandsById: any ): any {
    //     const headerData = header.fromBytes(data);

    //     if ( headerData.headerSize + headerData.commandSize < data.length ) {
    //         throw new Error(
    //             `Wrong header. Header size: ${headerData.headerSize}, command size: ${headerData.commandSize}, buffer size: ${data.length}.`
    //         );
    //     }

    //     const command = commandsById[headerData.commandId];

    //     if ( !command ) {
    //         throw new Error(
    //             `Unsupported command with id: ${headerData.commandId}.`
    //         );
    //     }

    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //     return command.fromBytes(
    //         data.slice(headerData.headerSize, headerData.headerSize + headerData.commandSize)
    //     );
    // }


    /**
     * Build header with body.
     *
     * @param id command id
     * @param commandData optional command binary data
     * @returns merged data
     */
    static toBytes ( id: number, commandData?: Uint8Array ): Uint8Array {
        const commandLength = commandData?.length ?? 0;
        const headerData = header.toBytes(id, commandLength);

        if ( commandData && commandLength ) {
            const resultData = new Uint8Array(headerData.length + commandLength);

            resultData.set(headerData);
            resultData.set(commandData, headerData.length);

            return resultData;
        }

        // simple command without body
        return headerData;
    }

    /** Get command parameters. */
    getParameters () {
        return this.parameters;
    }

    // eslint-disable-next-line class-methods-use-this
    toBytes (): Uint8Array {
        throw new Error('not implemented!');
    }

    toHex ( options: IHexFormatOptions = {} ) {
        return getHexFromBytes(this.toBytes(), options);
    }

    /**
     * Returns the command in JSON format.
     *
     * @returns JSON string contains current parameters
     */
    toJson () {
        return JSON.stringify(this.getParameters());
    }
}


export default Command;
