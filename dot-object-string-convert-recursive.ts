import { File } from 'server-service-file';
const FileService = new File();

setTimeout(() => {
    let strs: string[][] = Input.split(/(\r)?\n/)
        .filter((n) => !!n)
        .map((n) => n.split(/\.|=/).filter((n) => !!n));

    let obj: object = {};
    for (let i: number = 0; i < strs.length; i++) {
        resolveDataString(obj, strs[i]);
    }

    console.log(JSON.stringify(obj, null, 4));

    FileService.writeFile('./result/dot-object-string-convert-recursive.json', JSON.stringify(obj, null, 4));
}, 0);

const Input: string = `scheduleView.today.en-US=Today
scheduleView.today.zh-CN=true
scheduleView.today.zh-TW=当天
scheduleView.today.ko-KR=123
scheduleView.today.ja-JP=오늘
scheduleView.tues.en-US=Tues.
scheduleView.tues.zh-CN=false
scheduleView.tues.zh-TW=周二
scheduleView.tues.ko-KR=456
scheduleView.tues.ja-JP=화요일
scheduleView.week.fri.en-US=fri.
scheduleView.week.fri.zh-CN=true
scheduleView.week.fri.zh-TW=五
scheduleView.week.fri.ko-KR=789
scheduleView.week.fri.ja-JP=ブランド`;

const Output: object = {
    scheduleView: {
        today: {
            'en-US': 'Today',
            'zh-CN': 'true',
            'zh-TW': '当天',
            'ko-KR': '123',
            'ja-JP': '오늘',
        },
        tues: {
            'en-US': 'Tues.',
            'zh-CN': 'false',
            'zh-TW': '周二',
            'ko-KR': '456',
            'ja-JP': '화요일',
        },
        week: {
            fri: {
                'en-US': 'fri.',
                'zh-CN': 'true',
                'zh-TW': '五',
                'ko-KR': '789',
                'ja-JP': 'ブランド',
            },
        },
    },
};

/**
 *  use recursive
 *
 * @param obj
 * @param keys
 */
function resolveDataString(obj: object, keys: string[]): void {
    if (keys.length > 2) {
        if (!obj[keys[0]]) {
            obj[keys[0]] = {};
        }
        resolveDataString(obj[keys[0]], keys.splice(1, keys.length - 1));
    } else {
        console.log(keys);
        if (/[0-9]/.test(keys[1])) obj[keys[0]] = parseInt(keys[1]);
        else if (/true|false/.test(keys[1])) obj[keys[0]] = keys[1] === 'true';
        else obj[keys[0]] = keys[1];
    }
}
