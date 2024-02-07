/**
 *
 */
export interface IRandomTextPool {
    num: string[];
    EN: string[];
    en: string[];
    symbol: string[];
}

/**
 *
 */
export interface IRandomTextOption {
    num?: boolean;
    EN?: boolean;
    en?: boolean;
    symbol?: boolean;
}

/**
 *
 */
export enum ECompareVersionResult {
    greater = 1,
    equal,
    less,
}
