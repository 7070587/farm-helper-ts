import { encode } from 'html-entities';

import { DateTimeService, Base64Service } from '@/../helpers';
import { InputDatetimeModel } from '@/../components';

import { RegexService } from '@/helpers';

/**
 * @param  {string|Date=undefined} dateValue
 * @param  {string|InputDatetimeModel.EDatetimeFormat=InputDatetimeModel.EDatetimeFormat.date_slash_YYYYMMDD} format
 * @returns string
 */
export function resolveDate(
    dateValue: string | number | Date = undefined,
    format: string | InputDatetimeModel.EDatetimeFormat = InputDatetimeModel.EDatetimeFormat.date_slash_YYYYMMDD,
): string {
    if (!dateValue) return undefined;

    let result: string = '';
    let date: Date = undefined;

    if (typeof dateValue === 'string' || typeof dateValue === 'number') {
        date = new Date(dateValue);
    } else if (dateValue instanceof Date) {
        date = dateValue;
    }

    if (date instanceof Date && !isNaN(date.getTime())) {
        result = `${DateTimeService.datetime2String(date, format)}`;
    }

    return result;
}

/**
 * @param  {string} value
 * @returns string
 */
export function resolveCard(value: string, length: number = 8): string {
    if (!value) return '';
    return value.padStart(length, '0');
}

/**
 * @param  {boolean} value
 * @param  {any} vue
 * @param  {string=vue.$i18n.Common_Status_Yes} trueValue
 * @param  {string=vue.$i18n.Common_Status_No} falseValue
 * @param  {string} bothValue?
 * @returns string
 */
export function resolveBooleanToString(
    value: boolean,
    vue: any,
    trueValue: string = vue.$i18n.Common_Status_Yes,
    falseValue: string = vue.$i18n.Common_Status_No,
    bothValue?: string,
): string {
    if ((value === undefined || value === null) && !bothValue) return '';
    if ((value === undefined || value === null) && bothValue) return bothValue;
    if (value === true) return trueValue;
    if (value === false) return falseValue;
}

/**
 * @param  {string} value
 * @returns string
 */
export function resolvePhotoIsUrlOrBase64(value: string): string {
    if (!value) return undefined;
    if (Base64Service.isBase64Image(value)) return value;

    // TODO:
    // const imageURL: string = ServiceServerConfig.getURL + value;
    // return RegexService.isUrl(imageURL) ? imageURL : '';
}

/**
 * @param  {any[]} value
 * @param  {string} variableName
 * @returns string
 */
export function resolveArrayToString(value: any[], variableName: string): string {
    let result: string = '';

    (value || []).forEach((item) => {
        if (item[variableName]) result += `⦁ ${item[variableName]}\r\n`;
    });

    return result;
}

/**
 * @param  {any[]} value
 * @param  {string} variableName
 * @param  {string} joinValue
 * @returns string
 */
export function resolveArrayJoinToString(value: any[], variableName: string, joinValue: string): string {
    return (value || []).map((item: any) => item[variableName]).join(joinValue);
}

/**
 *
 *
 * @export
 * @param {number} score
 * @param {number} [decimalPlaces=10000] default 2 decimal places
 * @return {*}  {number}
 */
export function resolveScore(score: number, decimalPlaces: number = 10000, showPercent: boolean = true): number | string {
    if (score === undefined || score === null) return null;

    if (showPercent) {
        return (Math.round(score * decimalPlaces) * 100) / decimalPlaces + '%';
    }

    return (Math.round(score * decimalPlaces) * 100) / decimalPlaces;
}

/**
 * decide how many words to display in ui
 *
 * @export
 * @param {string} string
 * @param {number} [length=30]
 * @return {*}  {string}
 */
export function resolveStringLength(string: string, length: number = 30): string {
    if (!string) return '';
    return string.length <= 30 ? string : string.slice(0, 29) + '...';
}

/**
 * encode special characters to normal string
 *
 * @export
 * @param {string} string
 * @return {*}  {string}
 */
export function encodeString(string: string): string {
    return encode(string);
}

export const left_lt: string = encodeString('<');
export const right_gt: string = encodeString('>');
