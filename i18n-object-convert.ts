import { File } from 'server-service-file';
const FileService = new File();

setTimeout(() => {
    let target: object = {};
    convertI18n(Input, target);

    console.log(`target => `, target);

    FileService.writeFile('./result/i18n-object-convert.json', JSON.stringify(target, null, 4));
}, 0);

const Input: object = {
    'en-US': {
        scheduleView: {
            today: 'Today',
            tues: 'Tues.',
            userDefined: 'User Defined',
            wed: 'Wed.',
            week: {
                fri: 'Fri.',
                mon: 'Mon.',
                sat: 'Sat.',
            },
        },
        statistics: {
            descOrder: 'Desc.',
            ascOrder: 'Asc.',
            titles: {
                scoreDistribution: 'Score Distribution',
                rateDistribution: 'Standard Rate',
                inspectItemScore: 'Inspection Item Score',
            },
            overview: {
                count_subtitle: 'Inspections',
                avg_unit: 'p',
                avg_subtitle: 'Average Score',
            },
        },
    },
    'zh-CN': {
        scheduleView: {
            today: '当天',
            tues: '周二',
            userDefined: '自定义',
            wed: '周三',
            week: {
                fri: '五',
                mon: '一',
                sat: '六',
            },
        },
        statistics: {
            descOrder: '降序',
            ascOrder: '升序',
            titles: {
                scoreDistribution: '考评得分分布',
                rateDistribution: '考评达标率',
                inspectItemScore: '巡检项目得分',
            },
            overview: {
                count_subtitle: '总巡检次数',
                avg_unit: '分',
                avg_subtitle: '巡检平均得分',
            },
        },
    },
    'zh-TW': {
        scheduleView: {
            today: '當天',
            tues: '週二',
            userDefined: '自定義',
            wed: '週三',
            week: {
                fri: '五',
                mon: '一',
                sat: '六',
            },
        },
        statistics: {
            descOrder: '降序',
            ascOrder: '升序',
            titles: {
                scoreDistribution: '考評得分分佈',
                rateDistribution: '考評達標率',
            },
            overview: {
                count_subtitle: '總巡檢次數',
                avg_subtitle: '巡檢平均得分',
            },
        },
    },
    'ja-JP': {
        scheduleView: {
            today: '今日',
            tues: '火曜日',
            userDefined: 'ユーザーにより定義すること',
            wed: '水曜日',
            week: {
                fri: '金曜日',
                mon: '月曜日',
                sat: '土曜日',
            },
        },
    },
    'ko-KR': {
        scheduleView: {
            today: '오늘',
            tues: '화요일',
            userDefined: '사용자 정의하다',
            wed: '수요일',
            week: {
                fri: '금요일',
                sat: '토요일',
            },
        },
    },
};

const Output: object = {
    scheduleView: {
        today: {
            'en-US': 'Today',
            'zh-CN': '当天',
            'zh-TW': '當天',
            'ja-JP': '今日',
            'ko-KR': '오늘',
        },
        tues: {
            'en-US': 'Tues.',
            'zh-CN': '周二',
            'zh-TW': '週二',
            'ja-JP': '火曜日',
            'ko-KR': '화요일',
        },
        userDefined: {
            'en-US': 'User Defined',
            'zh-CN': '自定义',
            'zh-TW': '自定義',
            'ja-JP': 'ユーザーにより定義すること',
            'ko-KR': '사용자 정의하다',
        },
        wed: {
            'en-US': 'Wed.',
            'zh-CN': '周三',
            'zh-TW': '週三',
            'ja-JP': '水曜日',
            'ko-KR': '수요일',
        },
        week: {
            fri: {
                'en-US': 'Fri.',
                'zh-CN': '五',
                'zh-TW': '五',
                'ja-JP': '金曜日',
                'ko-KR': '금요일',
            },
            mon: {
                'en-US': 'Mon.',
                'zh-CN': '一',
                'zh-TW': '一',
                'ja-JP': '月曜日',
            },
            sat: {
                'en-US': 'Sat.',
                'zh-CN': '六',
                'zh-TW': '六',
                'ja-JP': '土曜日',
                'ko-KR': '토요일',
            },
        },
    },
    statistics: {
        descOrder: {
            'en-US': 'Desc.',
            'zh-CN': '降序',
            'zh-TW': '降序',
        },
        ascOrder: {
            'en-US': 'Asc.',
            'zh-CN': '升序',
            'zh-TW': '升序',
        },
        titles: {
            scoreDistribution: {
                'en-US': 'Score Distribution',
                'zh-CN': '考评得分分布',
                'zh-TW': '考評得分分佈',
            },
            rateDistribution: {
                'en-US': 'Standard Rate',
                'zh-CN': '考评达标率',
                'zh-TW': '考評達標率',
            },
            inspectItemScore: {
                'en-US': 'Inspection Item Score',
                'zh-CN': '巡检项目得分',
            },
        },
        overview: {
            count_subtitle: {
                'en-US': 'Inspections',
                'zh-CN': '总巡检次数',
                'zh-TW': '總巡檢次數',
            },
            avg_unit: {
                'en-US': 'p',
                'zh-CN': '分',
            },
            avg_subtitle: {
                'en-US': 'Average Score',
                'zh-CN': '巡检平均得分',
                'zh-TW': '巡檢平均得分',
            },
        },
    },
};

/**
 *
 * @param source
 * @param target
 */
function convertI18n(source: object, target: object): void;
function convertI18n(source: object, target: object, i18nKey: string): void;
function convertI18n(source: object, target: object, i18nKey?: string): void {
    for (let [key, value] of Object.entries(source)) {
        if (!i18nKey) {
            convertI18n(value, target, key);
        } else if (typeof value === 'object') {
            if (!target[key]) target[key] = {};
            convertI18n(value, target[key], i18nKey);
        } else {
            if (!target[key]) target[key] = {};
            if (!target[key][i18nKey]) target[key][i18nKey] = {};
            target[key][i18nKey] = value;
        }
    }
}
