import Command from './Command.js';
/**
 * Unknown command.
 */
class UnknownCommand extends Command {
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }
    // data - only body (without header)
    static fromBytes(data, id) {
        const parameters = { id, data };
        return new UnknownCommand(parameters);
    }
    // returns full message - header with body
    toBytes() {
        const { id, data } = this.parameters;
        return Command.toBytes(id, data);
    }
}
export default UnknownCommand;
//# sourceMappingURL=UnknownCommand.js.map