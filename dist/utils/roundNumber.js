export default (value, decimalPlaces = 4) => {
    const places = 10 ** decimalPlaces;
    return Math.round((value * places) * (1 + Number.EPSILON)) / places;
};
//# sourceMappingURL=roundNumber.js.map