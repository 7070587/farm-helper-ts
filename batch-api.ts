import { BatchApi } from './helpers/http-command/batch';
import { LogService, PrintService } from './helpers';

/**
 * 設定
 */

/**
 * url
 * @description set url
 * @required true
 * @example 'http://172.22.28.21:60753/device/wiegand?sessionId=r:70f249701606aca740a684b8237096ed&objectId=H9OwHZR7F0&objectId=CtDahyXtRn&objectId=8M9cGcWGX8&objectId=UX4SoISLkp&objectId=R0mnKmQRPq&objectId=hDhnFlpCDG&objectId=krdgKS7c5a&objectId=E8nImeUdhD&objectId=Swx0UYWbi0&objectId=14CqWfDAIA&objectId=KRBETJvxW9'
 */
const url: string = 'http://172.22.28.21:60753/device/wiegand?sessionId=r:8af0666cbb2702b5e42a28434cf8db87';

/**
 * method
 * @description set method
 * @range Model.EMethod.post / Model.EMethod.get / Model.EMethod.put / Model.EMethod.delete
 * @required true
 * @example BatchApi.EMethod.delete
 */
const method: BatchApi.EMethod = BatchApi.EMethod.post;

/**
 * duration
 * @description set duration, api duration
 * @unit ms
 * @range larger than or equal to 0, if duration = 0 it means no duration
 * @required true
 * @default 0
 */
const duration: number = 500;

/**
 * body
 * @description set body
 * @required true method = post or put
 * @required false method = get or delete
 * @example datas: [{name: "WG28", ip: "172.16.10.10", port: 28, mode: "iClass_WG26", objectId: "IGf6Q6nkHs"}]
 */
const body: string = `
{
    "datas": [
        {"name": "Wiegand_060", "ip": "172.22.28.181", "port": 64300, "mode": "iClass_WG26"},
        {"name": "Wiegand_160", "ip": "172.22.28.181", "port": 64310, "mode": "iClass_WG26"},
        {"name": "Wiegand_260", "ip": "172.22.28.181", "port": 64320, "mode": "iClass_WG34"},
        {"name": "Wiegand_360", "ip": "172.22.28.181", "port": 64330, "mode": "iClass_WG35"},
        {"name": "Wiegand_460", "ip": "172.22.28.181", "port": 64340, "mode": "Mifare_WG26"},
        {"name": "Wiegand_560", "ip": "172.22.28.181", "port": 64350, "mode": "Mifare_WG34"},
        {"name": "Wiegand_660", "ip": "172.22.28.181", "port": 64360, "mode": "iClass_WG26"},
        {"name": "Wiegand_760", "ip": "172.22.28.181", "port": 64370, "mode": "iClass_WG34"},
        {"name": "Wiegand_860", "ip": "172.22.28.181", "port": 64380, "mode": "iClass_WG35"},
        {"name": "Wiegand_960", "ip": "172.22.28.181", "port": 64390, "mode": "Mifare_WG34"}
    ]
}`;

/**
 * headers
 * @description set headers
 * @range type []
 * @required false
 * @example [{ Connection: keep-alive },{ Host: 172.22.28.181:6073 }]
 */
const headers: BatchApi.IHeader[] = undefined;

/**
 * timeout
 * @description set timeout
 * @unit ms
 * @range larger than or equal to 0, if timeout = 0 it means no timeout
 * @required false
 * @default 10000
 */
const timeout: number = 10000;

/**
 * isIgnoreHttpsCredentialError
 * @description set isIgnoreHttpsCredentialError, do you need to ignore https credential errors
 * @range true / false
 * @required false
 * @default false
 */
const isIgnoreHttpsCredentialError: boolean = false;

/**
 * isErrorInterrupt
 * @description set isErrorInterrupt, whether the task needs to be interrupted when an error occurs
 * @range true / false
 * @required false
 * @default false
 */
const isErrorInterrupt: boolean = true;

/**
 * delay
 * @description set delay, the intermediate delay time of each api
 * @unit ms
 * @range larger than or equal to 0, if delay = 0 it means no delay
 * @default 0
 * @required false
 */
const delay: number = 10;

/**
 * 不能碰
 */
setTimeout(async () => {
    const batchApi = new BatchApi();

    try {
        batchApi.url = url;
        batchApi.method = method;
        batchApi.duration = duration;

        batchApi.body = body;
        batchApi.headers = headers;
        batchApi.timeout = timeout;
        batchApi.isIgnoreHttpsCredentialError = isIgnoreHttpsCredentialError;
        batchApi.isErrorInterrupt = isErrorInterrupt;
        batchApi.delay = delay;

        batchApi.initialization();

        // count
        let totalCounts: number = 0;
        let successCounts: number = 0;
        let failCounts: number = 0;

        // time
        let totalTimeStartMs: number = new Date().getTime();
        let totalTimeMs: number = undefined;
        let averageTimeMs: number = undefined;
        let durationTimeMs: number = totalTimeStartMs + duration;

        let logApiConfig: BatchApi.ILogApiConfig = {
            url,
            method,
            duration,
            body,
            headers: JSON.stringify(headers, null, 4) ?? '',
            timeout,
            isIgnoreHttpsCredentialError: isIgnoreHttpsCredentialError,
            isErrorInterrupt: isErrorInterrupt,
            delay,
        };

        PrintService.log(batchApi.getLogApiConfig(logApiConfig), new Error(), 'message');
        LogService.newline();

        while (new Date().getTime() < durationTimeMs) {
            totalCounts++;
            let startTime: Date = new Date();
            let apiResponse: any = await batchApi.callApi();
            let endTime: Date = new Date();

            try {
                successCounts++;

                let logApiResponse: BatchApi.ILogApiResponse = {
                    apiResponse,
                    runCount: successCounts,
                    apiElapsesMs: endTime.getTime() - startTime.getTime(),
                };

                PrintService.log(batchApi.getLogApiResponse(logApiResponse), new Error(), 'message');

                batchApi.delayTimeMs(delay);
            } catch (e) {
                failCounts++;

                let logApiResponse: BatchApi.ILogApiResponse = {
                    apiResponse: e,
                    runCount: successCounts,
                    apiElapsesMs: endTime.getTime() - startTime.getTime(),
                };

                PrintService.log(batchApi.getLogApiResponse(logApiResponse), new Error(), 'message');

                batchApi.delayTimeMs(delay);

                if (isErrorInterrupt) break;
            } finally {
                LogService.newline();
            }
        }

        totalTimeMs = new Date().getTime() - totalTimeStartMs;
        averageTimeMs = Math.floor((totalTimeMs / totalCounts) * 100) / 100;
        PrintService.log(batchApi.getLogsApiFinallyCount(totalTimeMs, totalCounts, successCounts, failCounts, averageTimeMs), new Error(), 'message');
    } catch (e) {
        PrintService.log(e, new Error(), 'error');
    }
}, 0);
