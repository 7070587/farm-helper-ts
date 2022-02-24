import { File } from 'server-service-file';
const FileService = new File();

setTimeout(() => {
    let dataObj = resolveData(Input);
    console.log(`dataObj => `, dataObj);

    FileService.writeFile('./result/dot-object-convert.json', JSON.stringify(dataObj, null, 4));
}, 0);

const Input: object = {
    'scheduleView.today.en-US': 'Today',
    'scheduleView.today.zh-CN': '當天',
    'scheduleView.today.zh-TW': '当天',
    'scheduleView.today.ko-KR': '今日',
    'scheduleView.today.ja-JP': '오늘',

    'scheduleView.tues.en-US': 'Tues.',
    'scheduleView.tues.zh-CN': '週二',
    'scheduleView.tues.zh-TW': '周二',
    'scheduleView.tues.ko-KR': '水曜日',
    'scheduleView.tues.ja-JP': '화요일',

    'scheduleView.week.fri.en-US': 'fri.',
    'scheduleView.week.fri.zh-CN': '五',
    'scheduleView.week.fri.zh-TW': '五',
    'scheduleView.week.fri.ko-KR': '브랜드',
    'scheduleView.week.fri.ja-JP': 'ブランド',
};

const Output: object = {
    scheduleView: {
        today: {
            'en-US': 'Today',
            'zh-CN': '當天',
            'zh-TW': '当天',
            'ko-KR': '今日',
            'ja-JP': '오늘',
        },
        tues: {
            'en-US': 'Tues.',
            'zh-CN': '週二',
            'zh-TW': '周二',
            'ko-KR': '水曜日',
            'ja-JP': '화요일',
        },
        week: {
            fri: {
                'en-US': 'fri.',
                'zh-CN': '五',
                'zh-TW': '五',
                'ko-KR': '브랜드',
                'ja-JP': 'ブランド',
            },
        },
    },
};

/**
 * use while
 *
 * @param {object} obj
 * @return {*}
 */
function resolveData(obj: object): object {
    let result: object = {};

    let keyValue = Object.entries(obj);
    for (const [key, value] of keyValue) {
        // Split key keys array
        const keys: string[] = key.split('.');

        // Create sub-objects along key as needed
        let target: object = result;
        while (keys.length > 1) {
            const shiftKey = keys.shift();
            let targetValue = (target[shiftKey] = target[shiftKey] || {});
            target = targetValue;
            // target = target[shiftKey] = target[shiftKey] || {};
        }

        // Set value at end of path
        target[keys[0]] = value;
    }

    return result;
}

function resolveDataString(data: string): any {
    let result: object = {};

    let dataObj = data.split('\n');

    dataObj.forEach((data) => {
        let splitData: string[] = data.split('=');
        result[splitData[0]] = splitData[1];
    });

    return resolveData(result);
}
