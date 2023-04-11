/**
 * Get date object from UTC seconds since 2000 year.
 *
 * @param time - seconds since 2000 year
 * @returns Date object instance
 */
export declare const getDateFromSeconds: (time: number) => Date;
/**
 * Get UTC seconds since 2000 year from Date object.
 *
 * @param date - Date object
 * @returns seconds since 2000 year
 */
export declare const getSecondsFromDate: (date: Date) => number;
