import * as Os from 'os';

export namespace Utility {
    /**
     * String pad left some char
     * @param str
     * @param char
     * @param length
     */
    export function PadLeft(str: string, char: string, length: number): string {
        while (str.length < length) {
            str = `${char}${str}`;
        }
        return str;
    }

    /**
     * Convert string array to RegExp
     * @param array
     */
    export function Array2RegExp(...array: string[][]): RegExp {
        let strs: string[] = [].concat(...array);

        let regex: string = '';
        for (let str of strs) {
            regex += `${str}|`;
        }
        regex = regex.replace(/\|$/, '');

        return new RegExp(regex, 'g');
    }

    /**
     * Interface with ip
     */
    export interface INetwork {
        ifname: string;
        family: string;
        address: string;
        mac: string;
    }

    /**
     * Get ip list
     */
    export function GetNetwork(): INetwork[] {
        let ifaces = Os.networkInterfaces();

        let ips: INetwork[] = new Array<INetwork>()
            .concat(
                ...Object.keys(ifaces).map((ifname) => {
                    return ifaces[ifname].map((iface) => {
                        if ('IPv4' === iface.family && iface.internal === false) {
                            return {
                                ifname: ifname,
                                family: iface.family,
                                address: iface.address,
                                mac: iface.mac.toUpperCase(),
                            };
                        }
                    });
                }),
            )
            .filter((value, index, array) => {
                return value !== undefined;
            });

        return ips;
    }

    /**
     * Kill server
     */
    export function KillServer(): void {
        process.exit(1);
    }

    /**
     * Convert json object to json string when have type error: "Converting circular structure to JSON"
     * @param data
     */
    export function JsonString(data: any): string {
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
    }

    /**
     *
     */
    export interface ISortData {
        key: any;
        data: string;
    }
    interface ISortAnalysis extends ISortData {
        datas: number[];
    }
    /**
     * Natural sort
     * @param sources
     */
    export function NatSort(sources: ISortData[]): ISortData[] {
        let analysis: ISortAnalysis[] = sources.map((value, index, array) => {
            let datas: string[] = value.data.match(/\d+/g) || [];
            return {
                key: value.key,
                data: value.data,
                datas: datas.map(Number),
            };
        });

        // analysis = analysis.sort((a, b) => {
        //     let length: number = Math.max(a.datas.length, b.datas.length);
        //     for (let i: number = 0; i < length; i++) {
        //         let v1: number = a.datas[i] || -1;
        //         let v2: number = b.datas[i] || -1;

        //         let result: number = v1 - v2;
        //         if (result !== 0) {
        //             return result;
        //         }
        //     }

        //     return 0;
        // });

        return analysis.map((vlaue, index, array) => {
            return {
                key: vlaue.key,
                data: vlaue.data,
            };
        });
    }

    /**
     *
     */
    let pools: { num: string[]; EN: string[]; en: string[]; symbol: string[] } = {
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
     * Random Text
     * @param len
     * @param option
     */
    export function RandomText(len: number, option?: { num?: boolean; EN?: boolean; en?: boolean; symbol?: boolean }): string {
        try {
            option = {
                ...{
                    num: true,
                    EN: true,
                    en: true,
                    symbol: true,
                },
                ...option,
            };

            let strs: string[] = [];
            if (option.num) strs.push(...pools.num);
            if (option.EN) strs.push(...pools.EN);
            if (option.en) strs.push(...pools.en);
            if (option.symbol) strs.push(...pools.symbol);

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
     *
     */
    export function RandomColor(): string {
        let letters: string = '0123456789ABCDEF';

        let color: string = '#';
        for (let i: number = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    /**
     * Math round
     * @param x
     * @param position
     */
    export function Round(x: number, position: number): number {
        try {
            let multiple: number = Math.pow(10, position);

            return Math.round(x * multiple) / multiple;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Percentile
     * @param datas
     * @param percent 0-1
     */
    export function Percentile(datas: number[], percent: number): number {
        try {
            datas = JSON.parse(JSON.stringify(datas)).sort((a, b) => {
                return a - b;
            });

            let serial: number = (datas.length - 1) * percent;
            let i = Math.floor(serial);
            let j = serial - i;

            let percentile: number = (1 - j) * (datas[i] || 0) + j * (datas[i + 1] || 0);

            return Round(percentile, 2);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delay
     * @param time
     */
    export async function Delay(time: number): Promise<void> {
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, time);
            });
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     */
    export interface IValueRange {
        min: number;
        max: number;
    }

    /**
     * String to Value Range
     * @param str
     */
    export function Str2ValueRange(str: string): IValueRange[] {
        try {
            return str
                .split('-')
                .map(Number)
                .reduce<IValueRange[]>((prev, curr, index, array) => {
                    if (index !== 0) {
                        curr += prev[index - 1].min;
                        prev[index - 1].max = curr;
                    }

                    return prev.concat({
                        min: curr,
                        max: undefined,
                    });
                }, []);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get value range level
     * @param value
     * @param ranges
     * @param multiple
     */
    export function GetValueRangeLevel(value: number, ranges: IValueRange[]): number;
    export function GetValueRangeLevel(value: number, ranges: IValueRange[], multiple: number): number;
    export function GetValueRangeLevel(value: number, ranges: IValueRange[], multiple?: number): number {
        try {
            multiple = multiple || 1;

            let level: number = ranges.findIndex((value1, index1, array1) => {
                return value1.min * multiple <= value && (!value1.max || value1.max * multiple > value);
            });

            return level;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Merage array
     * @param array1
     * @param array2
     */
    export function MerageArray(array1: number[], array2: number[]): number[] {
        try {
            array1 = JSON.parse(JSON.stringify(array1 || []));
            array2 = JSON.parse(JSON.stringify(array2 || []));

            if (array1.length > array2.length) {
                array2.push(...Array.from({ length: array1.length - array2.length }, () => 0));
            } else {
                array1.push(...Array.from({ length: array2.length - array1.length }, () => 0));
            }

            let array: number[] = array1.map((value, index, array) => {
                return (value || 0) + (array2[index] || 0);
            });

            return array;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Sum
     * @param objs
     * @param key
     */
    export function Sum(datas: number[]): number;
    export function Sum(datas: object[], key: string): number;
    export function Sum(datas: any[], key?: string): number {
        try {
            let sum: number = 0;

            datas.forEach((value, index, array) => {
                if (key) {
                    sum += parseInt(value[key]);
                } else {
                    sum += value;
                }
            });

            return sum;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Batch
     * @param bufferCount
     * @param datas
     * @param Do
     */
    export async function Batch<T>(bufferCount: number, datas: T[], Do: (subDatas: T[]) => Promise<void>): Promise<void>;
    export async function Batch<T>(bufferCount: number, datas: T[], Do: (subDatas: T[], index: number) => Promise<void>): Promise<void>;
    export async function Batch<T>(bufferCount: number, datas: T[], Do: (subDatas: T[], index?: number) => Promise<void>): Promise<void> {
        try {
            for (let i: number = 0; i < datas.length; i += bufferCount) {
                await Do(datas.slice(i, i + bufferCount), i);
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Host Split
     * @param host
     * @param protocol
     */
    export function HostSplit(host: string): { hostname: string; port: string };
    export function HostSplit(host: string, protocol: 'http' | 'https'): { hostname: string; port: string };
    export function HostSplit(host: string, protocol?: 'http' | 'https'): { hostname: string; port: string } {
        try {
            protocol = protocol || 'http';

            let strs: string[] = host.split(':');
            let hostname: string = strs[0];
            let port: string = strs[1] || (protocol === 'https' ? '443' : '80');

            return {
                hostname: hostname,
                port: port,
            };
        } catch (e) {
            throw e;
        }
    }
}
