import { File } from 'server-service-file';
const FileService = new File();

setTimeout(() => {
    let result = _getKeys(Input, undefined, 0);

    console.log('result => ', result);

    FileService.writeFile('./result/object-invert-key-value.json', JSON.stringify(result, null, 4));
}, 0);

const Input: object = {
    aa: {
        bb: {
            cc: {
                dd: {
                    ee: {
                        ff: {
                            gg: {
                                hh: 'final',
                            },
                        },
                    },
                },
            },
        },
    },
};

const Output: object = {
    final: {
        key: {
            gg: {
                ff: {
                    ee: {
                        dd: {
                            cc: {
                                bb: 'aa',
                            },
                        },
                    },
                },
            },
        },
    },
};

// way 1
let keys: string[] = [];

function getKeys(obj): void {
    Object.keys(obj).forEach((key) => {
        keys.push(key);
        if (typeof obj[key] === 'object') {
            getKeys(obj[key]);
        } else {
            keys.push(obj[key]);
        }
    });
}

function getOutputValue() {
    let res: any = keys[0];
    for (let i = 1; i < keys.length; i++) {
        let key = keys[i];
        res = {
            [key]: res,
        };
    }
    return res;
}

console.log('getOutputValue => ', getOutputValue());

// way 2 遞迴: first output can be next input
/*
 * originalObj: original obj
 * result: new result
 * count: check if first time
 */
function _getKeys(originalObj: object, result: any, count: number): object {
    // console.log('_getKeys', obj, result, count);
    return Object.keys(originalObj).map((key) => {
        // console.log('map => ', key, obj[key]);
        if (typeof originalObj[key] === 'object') {
            // first time
            if (count === 0) {
                return _getKeys(originalObj[key], key, (count += 1));
            }

            let _result = {
                [key]: result,
            };
            return _getKeys(originalObj[key], _result, (count += 1));
        } else {
            // last key value
            return {
                [originalObj[key]]: {
                    key: result,
                },
            };
        }
    })[0];
}
