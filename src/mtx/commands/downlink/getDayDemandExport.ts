/**
 * Downlink command to get day energy `A-` by default or selected energy type (`A+` or `A-`) for 4 tariffs (`T1`-`T4`) for date.
 *
 * @packageDocumentation
 *
 * @example
 * ```js
 * import * as getDayDemandExport from 'jooby-codec/mtx/commands/downlink/getDayDemandExport.js';
 *
 * const parameters = {
 *     date: {
 *         year: 24,
 *         month: 3,
 *         date: 22
 *     },
 *     energyType: 1
 * };
 *
 * const bytes = getDayDemandExport.toBytes(parameters);
 *
 * // command binary representation
 * console.log(bytes);
 * // output:
 * [79, 4, 24, 3, 22, 1]
 * ```
 *
 * [Command format documentation](https://github.com/jooby-dev/jooby-docs/blob/main/docs/mtx/commands/GetDayDemandExport.md#request)
 */

import * as types from '../../types.js';
import CommandBinaryBuffer, {ICommandBinaryBuffer, TEnergyType} from '../../utils/CommandBinaryBuffer.js';
import * as command from '../../utils/command.js';
import {READ_ONLY} from '../../constants/accessLevels.js';


interface IGetDayDemandExportParameters {
    date: types.IDate,
    energyType?: TEnergyType
}


const MIN_COMMAND_SIZE = 3;
const MAX_COMMAND_SIZE = 4;


export const id: types.TCommandId = 0x4f;
export const name: types.TCommandName = 'getDayDemandExport';
export const headerSize = 2;
export const maxSize = MAX_COMMAND_SIZE;
export const accessLevel: types.TAccessLevel = READ_ONLY;
export const isLoraOnly = false;

export const examples: command.TCommandExamples = {
    'request day values for 2024.03.22 00:00:00 GMT': {
        id,
        name,
        headerSize,
        maxSize,
        accessLevel,
        parameters: {
            date: {
                year: 24,
                month: 3,
                date: 22
            }
        },
        bytes: [
            0x4f, 0x03,
            0x18, 0x03, 0x16
        ]
    },
    'request day values with energy type for 2024.03.22 00:00:00 GMT': {
        id,
        name,
        headerSize,
        maxSize,
        accessLevel,
        parameters: {
            date: {
                year: 24,
                month: 3,
                date: 22
            },
            energyType: 1
        },
        bytes: [
            0x4f, 0x04,
            0x18, 0x03, 0x16, 0x01
        ]
    }
};


/**
 * Decode command parameters.
 *
 * @param bytes - only body (without header)
 * @returns command payload
 */
export const fromBytes = ( bytes: types.TBytes ): IGetDayDemandExportParameters => {
    const buffer: ICommandBinaryBuffer = new CommandBinaryBuffer(bytes);

    if ( bytes.length === MAX_COMMAND_SIZE ) {
        return {
            date: buffer.getDate(),
            energyType: buffer.getUint8() as TEnergyType
        };
    }

    return {date: buffer.getDate()};
};


/**
 * Encode command parameters.
 *
 * @param parameters - command payload
 * @returns full message (header with body)
 */
export const toBytes = ( parameters: IGetDayDemandExportParameters ): types.TBytes => {
    const buffer: ICommandBinaryBuffer = new CommandBinaryBuffer(parameters?.energyType ? MAX_COMMAND_SIZE : MIN_COMMAND_SIZE);

    // body
    buffer.setDate(parameters?.date);

    if ( parameters?.energyType ) {
        buffer.setUint8(parameters.energyType);
    }

    return command.toBytes(id, buffer.data);
};
