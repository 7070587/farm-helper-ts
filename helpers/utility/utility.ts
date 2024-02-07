import * as Rx from 'rxjs';
import * as RxOperator from 'rxjs/operators';

import * as Namespace from './namespace';

export class Utility {
    /**
     * String pad left some char
     * @param str string
     * @param char string
     * @param length number
     * @returns string
     */
    public PadLeft(str: string, char: string, length: number): string {
        try {
            while (str.length < length) {
                str = `${char}${str}`;
            }
            return str;
        } catch (e) {
            throw e;
        }
    }

    /**
     * String pad right some char
     * @param str string
     * @param char string
     * @param length number
     * @returns string
     */
    public PadRight(str: string, char: string, length: number): string {
        try {
            while (str.length < length) {
                str = `${str}${char}`;
            }
            return str;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Convert json object to json string when have type error: "Converting circular structure to JSON"
     * @param data object
     * @returns string
     */
    public JsonString(data: object): string {
        try {
            let cache: object[] = [];
            let str: string = JSON.stringify(data, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        try {
                            return JSON.parse(JSON.stringify(value));
                        } catch (error) {
                            return;
                        }
                    }

                    cache.push(value);
                }
                return value;
            });

            return str;
        } catch (e) {
            throw e;
        }
    }

    /**
     * String Natural Split
     * @param str string
     * @returns string[]
     */
    public StringNaturalSplit(str: string): string[] {
        try {
            let strs: string[] = [];
            let temp: string = '';
            for (let _str of str) {
                if (isNaN(parseInt(_str))) {
                    if (temp !== '') {
                        strs.push(temp);
                        temp = '';
                    }
                } else {
                    if (isNaN(parseInt(temp))) {
                        strs.push(temp);
                        temp = '';
                    }
                }

                temp += _str;
            }
            strs.push(temp);
            strs = strs.filter((n) => !!n);

            return strs;
        } catch (e) {
            throw e;
        }
    }

    /**
     * String Natural sort
     * @param datas string[]
     * @param isAscending boolean
     * @returns string[]
     */
    public StringNaturalSort(datas: string[], isAscending: boolean): string[] {
        try {
            let order: number = isAscending ? -1 : 1;

            let _datas: string[] = datas.sort((a, b) => {
                let as = this.StringNaturalSplit(a);
                let bs = this.StringNaturalSplit(b);

                let length: number = Math.max(as.length, bs.length);
                for (let i: number = 0; i < length; i++) {
                    let char1 = as[i];
                    let char2 = bs[i];

                    let isChar1Number: boolean = !isNaN(parseInt(char1));
                    let isChar2Number: boolean = !isNaN(parseInt(char2));

                    if (isChar1Number !== isChar2Number) {
                        return (!isChar1Number ? 1 : -1) * order;
                    } else {
                        if (char1 === char2) {
                            continue;
                        } else {
                            switch (isChar1Number) {
                                case true:
                                    return (parseInt(char1) - parseInt(char2)) * order;
                                case false:
                                    if (char1 > char2) {
                                        return 1 * order;
                                    } else if (char1 < char2) {
                                        return -1 * order;
                                    } else {
                                        return 0 * order;
                                    }
                            }
                        }
                    }
                }
            });

            return _datas;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Object Natural sort
     * @param datas object[]
     * @param key string
     * @param isAscending boolean
     * @returns string[]
     */
    public ObjectNaturalSort(datas: object[], key: string, isAscending: boolean): object[] {
        try {
            let order: number = isAscending ? -1 : 1;

            let _datas: object[] = datas.sort((a, b) => {
                let _a = a[key];
                let _b = b[key];

                if ((_a === null || _a === undefined) && (_b === null || _b === undefined)) {
                    return 0;
                } else if (_a === null || _a === undefined) {
                    return order;
                } else if (_b === null || _b === undefined) {
                    return order * -1;
                }

                if (_a instanceof Date) {
                    return order * (_a.getTime() - _b.getTime());
                } else if (typeof _a === 'number') {
                    return order * (_a - _b);
                } else if (typeof _a === 'boolean') {
                    return order * ((_a ? 1 : 0) - (_b ? 1 : 0));
                } else {
                    let as = this.StringNaturalSplit(_a);
                    let bs = this.StringNaturalSplit(_b);

                    let length: number = Math.max(as.length, bs.length);
                    for (let i: number = 0; i < length; i++) {
                        let char1 = as[i];
                        let char2 = bs[i];

                        let isChar1Number: boolean = !isNaN(parseInt(char1));
                        let isChar2Number: boolean = !isNaN(parseInt(char2));

                        if (isChar1Number !== isChar2Number) {
                            return (!isChar1Number ? 1 : -1) * order;
                        } else {
                            if (char1 === char2) {
                                continue;
                            } else {
                                switch (isChar1Number) {
                                    case true:
                                        return (parseInt(char1) - parseInt(char2)) * order;
                                    case false:
                                        if (char1 > char2) {
                                            return 1 * order;
                                        } else if (char1 < char2) {
                                            return -1 * order;
                                        } else {
                                            return 0 * order;
                                        }
                                }
                            }
                        }
                    }
                }
            });

            return _datas;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    protected _pools: Namespace.IRandomTextPool = {
        num: [...Array(10).keys()].map((value, index, array) => {
            return String.fromCharCode(48 + value);
        }),
        EN: [...Array(26).keys()].map((value, index, array) => {
            return String.fromCharCode(65 + value);
        }),
        en: [...Array(26).keys()].map((value, index, array) => {
            return String.fromCharCode(97 + value);
        }),
        symbol: ['!', '@', '#', '$', '%', '&', '*', '+', '-', '?'],
    };

    /**
     * Random text
     * @param len number
     * @param option IRandomTextOption
     * @returns string
     */
    public RandomText(len: number): string;
    public RandomText(len: number, option: Namespace.IRandomTextOption): string;
    public RandomText(len: number, option?: Namespace.IRandomTextOption): string {
        option = {
            ...{
                num: true,
                EN: true,
                en: true,
                symbol: true,
            },
            ...option,
        };

        try {
            let strs: string[] = [];
            if (option.num) strs.push(...this._pools.num);
            if (option.EN) strs.push(...this._pools.EN);
            if (option.en) strs.push(...this._pools.en);
            if (option.symbol) strs.push(...this._pools.symbol);

            let str: string = [...Array(len).keys()]
                .map((value, index, array) => {
                    return strs[Math.floor(Math.random() * strs.length)];
                })
                .join('');

            return str;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Random color
     * @returns string
     */
    public RandomColor(): string {
        try {
            let letters: string = '0123456789ABCDEF';

            let color: string = '#';
            for (let i: number = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            return color;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Math round
     * @param x number
     * @param position number
     * @returns number
     */
    public Round(x: number, position: number): number {
        try {
            let multiple: number = Math.pow(10, position);

            return Math.round(x * multiple) / multiple;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delay
     * @async
     * @param timeMillisecond number
     */
    public async Delay(timeMillisecond: number): Promise<void> {
        try {
            await Rx.of(1).pipe(RxOperator.delay(timeMillisecond)).toPromise();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Batch
     * @param bufferCount number
     * @param datas T[]
     * @param Do (subData: T, index?: number) => Promise<void>
     */
    public async Batch<T>(bufferCount: number, datas: T[], Do: (subData: T) => Promise<void>): Promise<void>;
    public async Batch<T>(bufferCount: number, datas: T[], Do: (subData: T, index: number) => Promise<void>): Promise<void>;
    public async Batch<T>(bufferCount: number, datas: T[], Do: (subData: T, index?: number) => Promise<void>): Promise<void> {
        try {
            await Rx.from(datas)
                .pipe(
                    RxOperator.mergeMap(async (x, i) => {
                        await Do(x, i);
                    }, bufferCount),
                )
                .toPromise();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Compare Version
     * @param source string
     * @param target string
     * @returns ECompareVersionResult
     */
    public CompareVersion(source: string, target: string): Namespace.ECompareVersionResult {
        try {
            let sources: string[] = source.replace(/[^0-9.]/g, '').split('.');
            let targets: string[] = target.replace(/[^0-9.]/g, '').split('.');

            let loop: number = Math.max(sources.length, targets.length);
            for (let i: number = 0; i < loop; i++) {
                let _source: number = sources.length > i ? (sources[i] === '' ? -1 : parseInt(sources[i])) : 0;
                let _target: number = targets.length > i ? (targets[i] === '' ? -1 : parseInt(targets[i])) : 0;

                if (_source < 0 || _target < 0) {
                    continue;
                } else if (_source > _target) {
                    return Namespace.ECompareVersionResult.greater;
                } else if (_source < _target) {
                    return Namespace.ECompareVersionResult.less;
                }
            }

            return Namespace.ECompareVersionResult.equal;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get Enum Keys
     * @param target T
     * @returns string[]
     */
    public GetEnumKeys<T>(target: T): string[] {
        try {
            let length: number = Object.values(target).filter((n) => typeof n !== 'number').length;
            let keys: string[] = Object.entries(target)
                .filter((n, i, arr) => i >= arr.length - length)
                .map((n) => n[0]);

            return keys;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get Enum Values
     * @param target T
     * @returns (string | number)[]
     */
    public GetEnumValues<T>(target: T): (string | number)[] {
        try {
            let length: number = Object.values(target).filter((n) => typeof n !== 'number').length;
            let keys: string[] = Object.entries(target)
                .filter((n, i, arr) => i >= arr.length - length)
                .map((n) => n[1]);

            return keys;
        } catch (e) {
            throw e;
        }
    }
}
