import { ServiceUtilities } from './utilities';
import * as moment from 'moment'; // version 2.24.0

/**
 * @class ServiceDatetimeClass
 */
export class ServiceDatetimeClass {
    private _defaultDatetime2StringFormat: string = 'YYYY/MM/DD HH:mm:ss';
    /**
     * defaultDatetime2StringFormat
     * @description the default output format of method datetime2String
     * @property
     */
    public set defaultDatetime2StringFormat(value: string) {
        this._defaultDatetime2StringFormat = value || this._defaultDatetime2StringFormat;
    }
    public get defaultDatetime2StringFormat() {
        return this._defaultDatetime2StringFormat;
    }

    /**
     * set i18n
     * @param locale en, zh-tw
     * @param options allowed keys: months, monthsShort, weekdays, weekdaysShort, weekdayMins
     */
    public static setLocale(locale: ServiceDatetimeClass.TLocale): void;
    public static setLocale(locale: ServiceDatetimeClass.TLocale, options: ServiceDatetimeClass.ILocaleOptions): void;
    public static setLocale(locale: ServiceDatetimeClass.TLocale, options?: ServiceDatetimeClass.ILocaleOptions): void {
        try {
            if (!moment) throw new ReferenceError('moment undefined');
            moment.locale(locale);
            if (options) {
                moment.updateLocale(locale, options);
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * set i18n
     * @param locale en, zh-tw
     */
    public setLocale(locale: ServiceDatetimeClass.TLocale);
    public setLocale(locale: ServiceDatetimeClass.TLocale, options: ServiceDatetimeClass.ILocaleOptions);
    public setLocale(locale: ServiceDatetimeClass.TLocale, options?: ServiceDatetimeClass.ILocaleOptions) {
        try {
            ServiceDatetimeClass.setLocale(locale, options);
        } catch (error) {
            throw error;
        }
    }

    private _oneDayTimestamp: number = 86400000;
    /**
     * the millisecond per one day
     * @readonly
     * @returns 86400000 ms
     */
    public oneDayTimestamp(): number {
        return this._oneDayTimestamp;
    }

    /**
     * Convert date to format string like C#
     * @param {Date} datetime value want to transform
     * @param {string} format 'dddd', 'ddd', 'dd', 'DD', 'D', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'MMMM', 'MMM', 'MM', 'M', 'ss', 's', 'A', 'a', 'YYYY', 'YY', 'ZZ', 'Z'
     * @returns {string} datetime string in indicated format
     */
    public datetime2String(datetime: Date): string;
    public datetime2String(datetime: Date, format: string): string;
    public datetime2String(datetime: Date, format?: string): string {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;
            return moment(datetime).format(format);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert date to format string like C#
     * @param {Date} datetime value want to transform
     * @param {string} format 'dddd', 'ddd', 'dd', 'DD', 'D', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'MMMM', 'MMM', 'MM', 'M', 'ss', 's', 'A', 'a', 'YYYY', 'YY', 'ZZ', 'Z'
     * @returns {string} datetime string in indicated format
     */
    public toString(datetime: Date): string;
    public toString(datetime: Date, format: string): string;
    public toString(datetime: Date, format?: string): string {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            return this.datetime2String(datetime, format);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert date to format UTC string like C#
     * @param {Date} datetime value want to transform
     * @param {string} format 'dddd', 'ddd', 'dd', 'DD', 'D', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'MMMM', 'MMM', 'MM', 'M', 'ss', 's', 'A', 'a', 'YYYY', 'YY', 'ZZ', 'Z'
     * @returns {string} datetime string in indicated format
     */
    public datetime2UTCString(datetime: Date): string;
    public datetime2UTCString(datetime: Date, format: string): string;
    public datetime2UTCString(datetime: Date, format?: string): string {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;

            return moment(datetime).utc().format(format);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert date to format UTC string like C#
     * @param {Date} datetime value want to transform
     * @param {string} format 'dddd', 'ddd', 'dd', 'DD', 'D', 'hh', 'h', 'HH', 'H', 'mm', 'm', 'MMMM', 'MMM', 'MM', 'M', 'ss', 's', 'A', 'a', 'YYYY', 'YY', 'ZZ', 'Z'
     * @returns {string} datetime string in indicated format
     */
    public toUTCString(datetime: Date): string;
    public toUTCString(datetime: Date, format: string): string;
    public toUTCString(datetime: Date, format?: string): string {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;

            return this.datetime2UTCString(datetime, format);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert string to date (use moment)
     * @param {string} str
     * @param {string} format
     * @returns {Date} Date
     * @throws if datetime string format is invalid will throw an error
     */
    public string2Datetime(str: string);
    public string2Datetime(str: string, format: string);
    public string2Datetime(str: string, format?: string) {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;

            return moment(str, format).toDate();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert string to date (use moment)
     * @param {string} str
     * @param {string} format
     * @returns {Date} Date
     * @throws if datetime string format is invalid will throw an error
     */
    public toDate(str: string);
    public toDate(str: string, format: string);
    public toDate(str: string, format?: string) {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;

            return this.string2Datetime(str, format);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert utc string to date (use moment)
     * @param {string} strUTC
     * @param {string} format
     * @returns {Date} Date
     * @throws if datetime string format is invalid will throw an error
     */
    public stringUTC2Datetime(strUTC: string);
    public stringUTC2Datetime(strUTC: string, format: string);
    public stringUTC2Datetime(strUTC: string, format?: string) {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;

            return moment.utc(strUTC, format).toDate();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Convert utc string to date (use moment)
     * @param {string} strUTC
     * @param {string} format
     * @returns {Date} Date
     * @throws if datetime string format is invalid will throw an error
     */
    public toDateByUTC(strUTC: string);
    public toDateByUTC(strUTC: string, format: string);
    public toDateByUTC(strUTC: string, format?: string) {
        try {
            if (!moment) throw new ReferenceError('moment undefined');

            format = format || this.defaultDatetime2StringFormat;

            return this.stringUTC2Datetime(strUTC, format);
        } catch (error) {
            throw error;
        }
    }

    ///////// normalize related /////////
    /**
     * normalizeTime
     * @description normalize to 2000/01/01 for time
     * @param datetime
     */
    public normalizeTime(datetime: Date): Date {
        try {
            let newDatetime = new Date(datetime);
            newDatetime.setFullYear(2000, 0, 1);
            return newDatetime;
        } catch (error) {
            throw error;
        }
    }

    /**
     * normalizeDayRange
     * @description normalize to 2000/01/02 return a range
     * @param weekday 0 - 6
     */
    public normalizeDayRange(weekday: ServiceDatetimeClass.EWeekday): { startDate: Date; endDate: Date } {
        try {
            let startDate = new Date(2000, 0, 2 + weekday);
            let endDate = new Date(2000, 0, 2 + weekday + 1);

            return {
                startDate,
                endDate,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * normalizeDay
     * @description normalize to 2000/01/02 for weekday
     * @param datetime
     */
    public normalizeDay(datetime: Date): Date {
        try {
            let date = new Date(datetime);
            let weekDay = date.getDay();

            date.setFullYear(2000, 0, 2 + weekDay);

            return date;
        } catch (error) {
            throw error;
        }
    }

    /**
     * normalizeDayAndTime
     * @description will help to normalize startDate and endDate
     * @param weekday sunday, monday, tuesday, wednesday, thursday, friday, saturday
     * @param startime
     * @param endtime
     */
    public normalizeDayAndTime(weekday: ServiceDatetimeClass.EWeekday, startime: Date, endtime: Date): { startDate: Date; endDate: Date } {
        try {
            let normalizedStartTime = this.normalizeTime(startime);
            let normaizedEndTime = this.normalizeTime(endtime);

            let { startDate, endDate } = this.normalizeStartAndEndDate(normalizedStartTime, normaizedEndTime);

            let { startDate: dayStartDate, endDate: dayEndDate } = this.normalizeDayRange(weekday);

            startDate = this.toDate(`${this.toString(dayStartDate, 'YYYY/MM/DD')} ${this.toString(startDate, 'HH:mm:ss:SSS')}`);

            // endDate
            let endDateTimeMs = (endDate.getHours() * 60 * 60 + endDate.getMinutes() * 60 + endDate.getSeconds()) * 1000 + endDate.getMilliseconds();
            dayEndDate.setMilliseconds(-(this.oneDayTimestamp() - endDateTimeMs));
            endDate = dayEndDate;

            return {
                startDate,
                endDate,
            };
        } catch (error) {
            throw error;
        }
    }

    //#region Year related
    /**
     * Get the first date of the year from indicated date
     * @param {Date} datetime
     * @returns {Date} the first date of the year from indicated date
     */
    public yearStartDate(datetime: Date): Date {
        try {
            let date = new Date(datetime.getTime());
            date.setMonth(0);
            date.setDate(1);
            return this.dateStart(date);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get the last date of the year from indicated date
     * @param {Date} datetime
     * @returns {Date} the last date of the year from indicated date
     */
    public yearEndDate(datetime: Date): Date {
        try {
            let date = new Date(datetime.getTime());
            date.setFullYear(date.getFullYear() + 1);
            date.setMonth(0);
            date.setDate(1);
            date = this.dateStart(date);
            date.setMilliseconds(date.getMilliseconds() - 1);
            return date;
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    //#region Quarter related
    /**
     * Get quarter number
     * @description get quarter number from indicated date
     * @param {Date} datetime
     * @returns {number} quarter number from indicated date
     */
    public quarterNumber(datetime: Date): number {
        try {
            let date: Date = new Date(datetime.getTime());
            let month: number = Math.floor(date.getMonth() / 3) + 1;
            return month > 4 ? month - 4 : month;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get the first date of the quarter
     * @description get the first date of the quarter from indicated date or number
     * @param {Date|number} value
     * @returns {Date} the first date of the quarter from indicated date or number
     */
    public quarterStartDate(value: Date | 1 | 2 | 3 | 4): Date {
        try {
            // Date
            if (value instanceof Date) {
                let quarterNumber: any = this.quarterNumber(value);
                return this.dateStart(this.getQuarterStartDateFromNo(quarterNumber));
            }

            // number
            return this.getQuarterStartDateFromNo(value);
        } catch (error) {
            throw error;
        }
    }

    private getQuarterStartDateFromNo(quarterNo: 1 | 2 | 3 | 4) {
        try {
            let quartStartMonth = (quarterNo - 1) * 3;
            let date = new Date();
            date.setMonth(quartStartMonth);
            date.setDate(1);
            return this.dateStart(date);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get the last date of the quarter
     * @description get the last date of the quarter from indicated date or number
     * @param {Date} value
     * @returns {Date} the last date of the quarter from indicated date or number
     */
    public quarterEndDate(value: Date | 1 | 2 | 3 | 4): Date {
        if (value instanceof Date) {
            let quarterNumber: any = this.quarterNumber(value);
            return this.getQuarterEndDateFromNo(quarterNumber);
        }
        return this.getQuarterEndDateFromNo(value);
    }

    private getQuarterEndDateFromNo(quarterNo: 1 | 2 | 3 | 4) {
        try {
            let date = this.dateStart(new Date());
            let quartNextStartMonth = quarterNo * 3;
            date.setMonth(quartNextStartMonth);
            date.setDate(1);
            date.setMilliseconds(date.getMilliseconds() - 1);
            return date;
        } catch (error) {
            throw error;
        }
    }

    //#endregion

    //#region Month related
    /**
     * Get start date of the month
     * @param {Date} datetime
     * @param {number} stepMonth default: 0; unit: month; ex. if pass date: 2020/02/15, stepMonth: 1 will return 2020/03/01
     * @returns {Date} start date of the month
     */
    public monthStartDate(datetime: Date, stepMonth: number = 0): Date {
        try {
            let date = new Date(datetime.getTime());
            date.setMonth(date.getMonth() + stepMonth);
            date.setDate(1);
            return this.dateStart(date);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get last date of the month
     * @param {Date} datetime
     * @param {number} stepMonth default: 0; unit: month; ex. if pass date: 2020/02/15, stepMonth: 1 will return 2020/03/31
     * @returns {Date} last date of the month
     */
    public monthEndDate(datetime: Date, stepMonth: number = 0): Date {
        try {
            let date = this.dateStart(new Date(datetime.getTime()));
            let oriMonth = date.getMonth();
            date.setMonth(date.getMonth() + stepMonth + 1);
            if (date.getMonth() - oriMonth > 1) {
                date.setDate(date.getDate() - 7);
            }
            date.setDate(1);
            date.setMilliseconds(date.getMilliseconds() - 1);
            return date;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get day counts of the month
     * @param {Date} datetime
     * @param {number} stepMonth default: 0; unit: month; ex. if pass date: 2020/01/15, stepMonth: 1 will return 29
     * @returns {number} the day counts of the month
     */
    public monthDateCount(datetime: Date, stepMonth: number = 0): number {
        try {
            datetime.setMonth(datetime.getMonth() + stepMonth);
            return this.monthEndDate(datetime).getDate();
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    //#region Week related
    /**
     * Get the week number of indicated date
     * @param {Date} datetime
     * @returns {number} the week number of indicated date
     */
    public weekNumber(datetime: Date): number {
        try {
            let date = this.dateStart(new Date(datetime.getTime()));
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / this._oneDayTimestamp;
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get date by week day condition
     * @description ex. want to get next monday date: Datetime.weekDate(new Date(), 1, 1)
     * @param {Date} datetime
     * @param {number} weekday sunday, monday, tuesday, wednesday, thursday, friday, saturday
     * @param {number} stepWeek default: 0; unit: week(7 days)
     * @returns {Date} date
     * @throws if weekday out of range (not between 0 - 6)
     */
    public weekDate(datetime: Date, weekday: ServiceDatetimeClass.EWeekday, stepWeek: number = 0): Date {
        try {
            // get current weekday of the datetime
            // normalize
            const date = this.dateStart(datetime);
            let currentWeekday = date.getDay();

            let resultDate = new Date(date);

            // get start date of the week
            resultDate.setDate(date.getDate() - currentWeekday);

            resultDate.setDate(resultDate.getDate() + weekday + stepWeek * 7);

            return resultDate;
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    //#region Date related
    /**
     * Get the indicated date
     * @param {Date} datetime
     * @param {number} step default: 0; the value want to add by specific unit
     * @param {TTimeUnit} unit the unit want to add by step; allowed value: year, month, week, day, hour, minute, second, millisecond; default: day
     * @returns {Date}
     */
    public dateByStep(datetime: Date, step: number = 0, unit: ServiceDatetimeClass.TTimeUnit = 'day'): Date {
        try {
            if (!moment) throw new ReferenceError('moment undefined');
            return moment(datetime).add(step, unit).toDate();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get the 00:00:00 of the date
     * @param {Date} datetime
     * @param {number} stepDay default: 0; unit: day
     * @returns {Date} the start of the date
     */
    public dateStart(datetime: Date, stepDay: number = 0): Date {
        try {
            let date = this.dateByStep(datetime, stepDay);
            date.setHours(0, 0, 0, 0);
            return date;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get the 23:59:59:999 of the date
     * @param {Date} datetime
     * @param {number} stepDay default: 0; unit: day
     * @returns {Date} the end of the date
     */
    public dateEnd(datetime: Date, stepDay: number = 0): Date {
        try {
            let date = this.dateStart(this.dateByStep(datetime, stepDay + 1));
            date.setMilliseconds(date.getMilliseconds() - 1);
            return date;
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    //#region End related
    /**
     * endDate
     * @description ex. 2020/5/25 -> 2020-05-25T15:59:59.999Z
     * @param datetime
     */
    public endDate(datetime: Date): Date {
        try {
            return this.dateEnd(datetime);
        } catch (error) {
            throw error;
        }
    }

    /**
     * endHour
     * @description ex. 2020/5/25 18:00 -> 2020-05-25T10:59:59.999Z
     * @param datetime
     */
    public endHour(datetime: Date): Date {
        try {
            let date = new Date(datetime);
            date.setMinutes(59);
            date.setSeconds(59);
            date.setMilliseconds(999);

            return date;
        } catch (error) {
            throw error;
        }
    }

    /**
     * endMinute
     * @description ex. 2020/5/25 18:16 -> 2020-05-25T10:16:59.999Z
     * @param datetime
     */
    public endMinute(datetime: Date): Date {
        try {
            let date = new Date(datetime);
            date.setSeconds(59);
            date.setMilliseconds(999);

            return date;
        } catch (error) {
            throw error;
        }
    }

    /**
     * endSec
     * @description ex. 2020/5/25 18:16:33 -> 2020-05-25T10:16:33.999Z
     * @param datetime
     */
    public endSec(datetime: Date) {
        try {
            let date = new Date(datetime);
            date.setMilliseconds(999);

            return date;
        } catch (error) {
            throw error;
        }
    }
    //#endregion

    //#region Schedule related
    /**
     * checkRangesOverlap
     * @description if one of data overlap will return
     * @param ranges an array which want to check range is overlap
     */
    public checkRangesOverlap(ranges: ServiceDatetimeClass.IRange[]): ServiceDatetimeClass.IRangeOverlapResponse {
        if (!Array.isArray(ranges) || (Array.isArray(ranges) && ranges.length < 1)) {
            return { isOverlap: false, now: -1, overlap: -1 };
        }

        let i: number = 0;
        let j: number = 0;
        for (i = 1; i < ranges.length; i++) {
            let curr = ranges[i];

            for (j = i - 1; j >= 0; j--) {
                let prev = ranges[j];

                if ((curr.startDate.getTime() <= prev.startDate.getTime() && prev.startDate.getTime() < curr.endDate.getTime()) || (prev.startDate.getTime() <= curr.startDate.getTime() && curr.startDate.getTime() < prev.endDate.getTime())) {
                    return {
                        isOverlap: true,
                        now: i,
                        overlap: j,
                    };
                }
            }
        }
        return {
            isOverlap: false,
            now: i - 1,
            overlap: -1,
        };
    }

    /**
     * checkRangesOverlapAll
     * @description compare whole data then return
     * @param ranges an array which want to check range is overlap
     */
    public checkRangesOverlapAll(ranges: ServiceDatetimeClass.IRange[]): ServiceDatetimeClass.IRangeOverlapAllRepsonse {
        if (!Array.isArray(ranges) || (Array.isArray(ranges) && ranges.length < 1)) {
            return { isOverlap: false, results: [] };
        }

        let i: number = 0;
        let j: number = 0;
        let results: ServiceDatetimeClass.IRangeOverlapResponse[] = [
            {
                isOverlap: false,
                now: i,
                overlap: -1,
            },
        ];
        for (i = 1; i < ranges.length; i++) {
            let curr = ranges[i];

            for (j = i - 1; j >= 0; j--) {
                let prev = ranges[j];

                if ((curr.startDate.getTime() <= prev.startDate.getTime() && prev.startDate.getTime() < curr.endDate.getTime()) || (prev.startDate.getTime() <= curr.startDate.getTime() && curr.startDate.getTime() < prev.endDate.getTime())) {
                    break;
                }
            }

            results.push({
                isOverlap: j !== -1,
                now: i,
                overlap: j,
            });
        }

        let isOverlap = results.some((item) => item.isOverlap);
        return {
            isOverlap,
            results,
        };
    }
    //#endregion

    /**
     * @description to confirm the two input date which is bigger and return startDate/endDate object
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @returns {object} { startDate: Date, endDate: Date }
     */
    public normalizeStartAndEndDate(firstDate: Date, secondDate: Date): { startDate: Date; endDate: Date } {
        let result = { startDate: new Date(firstDate), endDate: new Date(secondDate) };
        if (result.startDate.getTime() > result.endDate.getTime()) {
            let tempDate: number = result.startDate.getTime();
            result.startDate = new Date(result.endDate.getTime());
            result.endDate = new Date(tempDate);
        }
        return result;
    }

    /**
     * @description to check whether the two input date is diff in 24 hrs
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @returns {boolean}
     */
    public isSameDateIn24h(firstDate: Date, secondDate: Date): boolean {
        let sortDateItem = this.normalizeStartAndEndDate(firstDate, secondDate);
        if (sortDateItem.endDate.getTime() - sortDateItem.startDate.getTime() < this._oneDayTimestamp) {
            return true;
        }
        return false;
    }

    /**
     * Check two input datetime is same date
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @returns {boolean}
     */
    public isSameDate(firstDate: Date, secondDate: Date): boolean {
        try {
            return this.dateStart(firstDate).getTime() === this.dateStart(secondDate).getTime();
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description to get all date between the indicated duration
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @returns {Date[]} a list of date of the indicated duration
     */
    public dateList(firstDate: Date, secondDate: Date): Date[] {
        let result = [];
        let sortDateItem = this.normalizeStartAndEndDate(firstDate, secondDate);
        let loopTimestamp = sortDateItem.startDate.getTime();
        let endTimeStamp = sortDateItem.endDate.getTime();
        result.push(new Date(loopTimestamp));
        while (loopTimestamp < endTimeStamp) {
            loopTimestamp += this._oneDayTimestamp;
            result.push(new Date(loopTimestamp));
        }
        return result;
    }

    /**
     * Check whether endDate is bigger than startDate
     * @param {Date} startDate
     * @param {Date} endDate
     * @returns {boolean}
     */
    public isValidDuration(startDate: Date, endDate: Date): boolean {
        try {
            return this.dateStart(endDate).getTime() >= this.dateStart(startDate).getTime();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Excel Date to JS Date
     * @description transfer excel date to js date
     * @param {number} excelDate
     * @returns {Date}
     */
    public excelDateToDate(excelDate: number): Date {
        return new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    }

    /**
     * Add leading by '0'
     * @description if string/number length < 2, add '0' to leading
     * @param {string|number} value
     */
    public dateStringAddLeadingZero(value: string | number): string {
        if (typeof value == 'number') {
            value = value.toString();
        }
        return ServiceUtilities.padLeft(value, '0', 2);
    }

    /**
     * Align Date
     * @param datetime date want to deal with
     * @param {ServiceDatetimeClass.EAlignType} type
     * @description minute: ex. 12:55:44 -> 12:55:00;
     * @param step offset
     */
    public alignDate(datetime: Date, type: ServiceDatetimeClass.EAlignType): Date;
    public alignDate(datetime: Date, type: ServiceDatetimeClass.EAlignType, step: number): Date;
    public alignDate(datetime: Date, type: ServiceDatetimeClass.EAlignType, step?: number): Date {
        try {
            step = step || 0;

            datetime = new Date(datetime);
            switch (type) {
                /**
                 * minute: ex.12:44:55 -> 12:44:00
                 */
                case ServiceDatetimeClass.EAlignType.minute:
                    datetime.setMinutes(datetime.getMinutes() + step, 0, 0);
                    break;
                case ServiceDatetimeClass.EAlignType.hour:
                    datetime.setHours(datetime.getHours() + step, 0, 0, 0);
                    break;
                case ServiceDatetimeClass.EAlignType.day:
                    datetime.setHours(0, 0, 0, 0);
                    datetime.setDate(datetime.getDate() + step);
                    break;
                case ServiceDatetimeClass.EAlignType.month:
                    datetime.setHours(0, 0, 0, 0);
                    datetime.setMonth(datetime.getMonth() + step, 1);
                    break;
                case ServiceDatetimeClass.EAlignType.season:
                    let season = Math.ceil((datetime.getMonth() + 1) / 3);

                    datetime.setHours(0, 0, 0, 0);
                    datetime.setMonth((season - 1 + step) * 3, 1);
                    break;
                case ServiceDatetimeClass.EAlignType.fiveMinutes:
                    datetime.setMinutes((Math.floor(datetime.getMinutes() / 5) + step) * 5, 0, 0);
                    break;
                case ServiceDatetimeClass.EAlignType.tenMinutes:
                    datetime.setMinutes((Math.floor(datetime.getMinutes() / 10) + step) * 10, 0, 0);
                    break;
                case ServiceDatetimeClass.EAlignType.fifteenMinutes:
                    datetime.setMinutes((Math.floor(datetime.getMinutes() / 15) + step) * 15, 0, 0);
                    break;
                case ServiceDatetimeClass.EAlignType.thirtyMinutes:
                    datetime.setMinutes((Math.floor(datetime.getMinutes() / 30) + step) * 30, 0, 0);
                    break;
            }
            return datetime;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Align Date
     * @param datetime date want to deal with
     * @param type "minute" | "hour" | "day" | "month" | "season" | "fiveMinutes" | "tenMinutes" | "fifteenMinutes" | "thirtyMinutes"
     * @description minute: ex. 12:55:44 -> 12:55:00;
     * @param step offset
     */
    public alignDateStr(datetime: Date, type: ServiceDatetimeClass.TAlignType): Date;
    public alignDateStr(datetime: Date, type: ServiceDatetimeClass.TAlignType, step: number): Date;
    public alignDateStr(datetime: Date, type: ServiceDatetimeClass.TAlignType, step?: number): Date {
        try {
            step = step || 0;
            return this.alignDate(datetime, ServiceDatetimeClass.EAlignType[type], step);
        } catch (e) {
            throw e;
        }
    }

    /**
     * DisassembleDateDiff
     * @description disassemble difference between two date
     * @param firstDate
     * @param secondDate
     * @returns {ServiceDatetimeClass.IDisassembleDate} { day: number; hour: number; minute: number; second: number }
     */
    public disassembleDateDiff(firstDate: Date, secondDate: Date): ServiceDatetimeClass.IDisassembleDate {
        let result: ServiceDatetimeClass.IDisassembleDate = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        };
        let hourTimestamp = this.oneDayTimestamp() / 24;
        let minuteTimestamp = this.oneDayTimestamp() / 1440;
        let secondTimestamp = this.oneDayTimestamp() / 86400;
        let dateSort = this.normalizeStartAndEndDate(firstDate, secondDate);
        let startDateTimestamp: number = dateSort.startDate.getTime();
        let endDateTimestamp: number = dateSort.endDate.getTime();
        let timestampGap = endDateTimestamp - startDateTimestamp;
        if (timestampGap / this.oneDayTimestamp() > 1) {
            result.day = Math.floor(timestampGap / this.oneDayTimestamp());
            timestampGap = timestampGap % this.oneDayTimestamp();
        }
        if (timestampGap / hourTimestamp > 1) {
            result.hour = Math.floor(timestampGap / hourTimestamp);
            timestampGap = timestampGap % hourTimestamp;
        }
        if (timestampGap / minuteTimestamp > 1) {
            result.minute = Math.floor(timestampGap / minuteTimestamp);
            timestampGap = timestampGap % minuteTimestamp;
        }
        if (timestampGap / secondTimestamp > 1) {
            result.second = Math.floor(timestampGap / secondTimestamp);
            timestampGap = secondTimestamp % secondTimestamp;
        }
        return result;
    }
}

export namespace ServiceDatetimeClass {
    // T stands for (content) type, L stands for the array fixed length
    export type ArrayFixed<T, L extends number> = [T, ...Array<T>] & { length: L };

    export enum ELocale {
        'zh-tw' = 'zh-tw',
        'en' = 'en',
    }
    export type TLocale = keyof typeof ELocale;

    export interface ILocaleOptions {
        months?: ArrayFixed<string, 12>;
        monthsShort?: ArrayFixed<string, 12>;
        weekdays?: ArrayFixed<string, 7>;
        weekdaysShort?: ArrayFixed<string, 7>;
        weekdaysMin?: ArrayFixed<string, 7>;
    }

    export enum EAlignType {
        minute = 1,
        hour,
        day,
        month,
        season,

        fiveMinutes = 11,
        tenMinutes,
        fifteenMinutes,
        thirtyMinutes,
    }
    export type TAlignType = keyof typeof EAlignType;

    export enum EWeekday {
        sunday = 0,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
    }

    export enum ETimeUnit {
        year,
        month,
        week,
        day,
        hour,
        minute,
        second,
        millisecond,
    }
    export type TTimeUnit = keyof typeof ETimeUnit;

    export interface IDisassembleDate {
        day: number;
        hour: number;
        minute: number;
        second: number;
    }

    export interface IRange {
        startDate: Date;
        endDate: Date;
    }

    export interface IRangeOverlapResponse {
        isOverlap: boolean;
        now: number;
        overlap: number;
    }

    export interface IRangeOverlapAllRepsonse {
        isOverlap: boolean;
        results: IRangeOverlapResponse[];
    }
}

/**
 * @instance the instance of DatetimeClass
 */
export const ServiceDatetime = new ServiceDatetimeClass();
