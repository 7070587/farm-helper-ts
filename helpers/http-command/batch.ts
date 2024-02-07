import axios, { AxiosRequestConfig } from 'axios';

import * as http from 'http';
import * as https from 'https';

export class BatchApi {
    //#region variables get set

    //#region url
    private _url: string = undefined;

    /**
     * get url
     * @returns string
     */
    public get url(): string {
        return this._url;
    }

    /**
     * set url
     * @param value string
     */
    public set url(value: string) {
        this._url = value;
    }
    //#endregion url

    //#region method
    private _method: BatchApi.EMethod = undefined;

    /**
     * get method
     * @returns BatchApi.EMethod
     */
    public get method(): BatchApi.EMethod {
        return this._method;
    }

    /**
     * set method
     * @param value string
     */
    public set method(value: BatchApi.EMethod) {
        this._method = value;
    }
    //#endregion method

    //#region body
    private _body: string = undefined;

    /**
     * get body
     * @returns string
     */
    public get body(): string {
        return this._body;
    }

    /**
     * set body
     * @param value string
     */
    public set body(value: string) {
        this._body = value;
    }
    //#endregion body

    //#region headers
    private _headers: BatchApi.IHeader[] = undefined;

    /**
     * get headers
     * @returns BatchApi.IHeader[]
     */
    public get headers(): BatchApi.IHeader[] {
        return this._headers;
    }

    /**
     * set headers
     * @param value string
     */
    public set headers(value: BatchApi.IHeader[]) {
        this._headers = value;
    }
    //#endregion headers

    //#region duration
    private _duration: number = undefined;

    /**
     * get duration
     * @returns number
     */
    public get duration(): number {
        return this._duration;
    }

    /**
     * set duration
     * @param value number
     */
    public set duration(value: number) {
        this._duration = value;
    }
    //#endregion duration

    //#region timeout
    private _timeout: number = 10000;

    /**
     * get timeout
     * @returns number
     */
    public get timeout(): number {
        return this._timeout;
    }

    /**
     * set timeout
     * @param value number
     */
    public set timeout(value: number) {
        this._timeout = value;
    }
    //#endregion timeout

    //#region delay
    private _delay: number = 0;

    /**
     * get delay
     * @returns number
     */
    public get delay(): number {
        return this._delay;
    }

    /**
     * set delay
     * @param value number
     */
    public set delay(value: number) {
        this._delay = value;
    }
    //#endregion delay

    //#region isIgnoreHttpsCredentialError
    private _isIgnoreHttpsCredentialError: boolean = false;

    /**
     * get _isIgnoreHttpsCredentialError
     * @returns boolean
     */
    public get isIgnoreHttpsCredentialError(): boolean {
        return this._isIgnoreHttpsCredentialError;
    }

    /**
     * set _isIgnoreHttpsCredentialError
     * @param value boolean
     */
    public set isIgnoreHttpsCredentialError(value: boolean) {
        this._isIgnoreHttpsCredentialError = value;
    }
    //#endregion isIgnoreHttpsCredentialError

    //#region isErrorInterrupt
    private _isErrorInterrupt: boolean = false;

    /**
     * get _isErrorInterrupt
     * @returns boolean
     */
    public get isErrorInterrupt(): boolean {
        return this._isErrorInterrupt;
    }

    /**
     * set _isErrorInterrupt
     * @param value boolean
     */
    public set isErrorInterrupt(value: boolean) {
        this._isErrorInterrupt = value;
    }
    //#endregion isErrorInterrupt

    //#endregion variables get set

    //#region Not edit
    /**
     * Http Agent
     */
    private _httpAgent: http.Agent = new http.Agent({ keepAlive: true });

    /**
     * Https Agent
     */
    private _httpsAgent: https.Agent = new https.Agent({ keepAlive: true, rejectUnauthorized: this._isIgnoreHttpsCredentialError });

    //#region isInitialization
    /**
     * Initialization Flag
     */
    private _isInitialization: boolean = false;

    /**
     * get Initialization Flag
     * @returns boolean
     */
    public get isInitialization(): boolean {
        return this._isInitialization;
    }
    //#endregion isInitialization

    //#endregion Not edit

    /**
     * initialization param
     *
     * @memberof BatchApi
     */
    public initialization(): void {
        try {
            this._isInitialization = false;

            //#region check params
            if (!this._url) {
                throw 'url is required';
            }

            if (!this._method) {
                throw 'method is required';
            }

            if (!this._duration === undefined) {
                throw 'duration is required';
            }

            if (this._duration < 0) {
                throw 'duration must be larger than 0';
            }

            if ((this._method === BatchApi.EMethod.post || this._method === BatchApi.EMethod.put) && !this._body) {
                throw 'if method is post or put, body is required';
            }
            //#endregion params

            this._httpAgent = new http.Agent({ keepAlive: true });
            this._httpsAgent = new https.Agent({ keepAlive: true, rejectUnauthorized: this._isIgnoreHttpsCredentialError });

            this._isInitialization = true;
        } catch (e) {
            throw e;
        }
    }

    /**
     * call api
     * @async
     * @return void
     * @memberof BatchApi
     */
    public async callApi(): Promise<void> {
        try {
            //#region variables

            let isJson: boolean = this.isJson(this._body);
            let body: object = undefined;
            let headers: object = this.getHeader(this._headers, isJson);

            let config: AxiosRequestConfig = {
                method: this._method,
                url: this._url,
                responseType: 'json',
                timeout: this._timeout,
                httpAgent: this._httpAgent,
                httpsAgent: this._httpsAgent,
                headers: this._headers,
            };

            //#endregion variables
            switch (this._method) {
                case BatchApi.EMethod.post:
                case BatchApi.EMethod.put:
                    body = !!this._body ? JSON.parse(this._body) : {};
                    headers['content-length'] = JSON.stringify(body).length;

                    config.headers = headers;
                    config.data = body;
                    break;

                case BatchApi.EMethod.get:
                case BatchApi.EMethod.delete:
                    config;
                    break;

                default:
                    break;
            }

            let apiResponse = await new Promise<any>((resolve, reject) => {
                try {
                    axios(config)
                        .then((response) => {
                            let data: string = typeof response.data === 'object' ? JSON.stringify(response.data, null, 4) : response.data;
                            return resolve(data);
                        })
                        .catch((e) => {
                            return reject(this.errorHandler(e));
                        });
                } catch (e) {
                    return reject(this.errorHandler(e));
                }
            }).catch((e) => {
                throw e;
            });

            return apiResponse;
        } catch (e) {
            throw e;
        }
    }

    /**
     * get headers
     *
     * @param headers BatchApi.IHeader[]
     * @returns object
     */
    private getHeader(headers: BatchApi.IHeader[], isJson: boolean): object {
        try {
            let header: { [x: string]: string } = {};
            (headers || []).forEach((item) => {
                header[item.key] = item.value;
            });

            if (isJson) {
                header['content-type'] = 'application/json';
            } else {
                header['content-type'] = 'plain/text';
            }

            return header;
        } catch (e) {
            throw e;
        }
    }

    /**
     * check value is json
     *
     * @private
     * @param string str
     * @return boolean
     * @memberof BatchApi
     */
    private isJson(str: string): boolean {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * error handle
     *
     * @private
     * @param any error
     * @return string
     * @memberof BatchApi
     */
    private errorHandler(error: any): string {
        try {
            if (!!error.response) {
                let response = error.response;
                if (response.status === 404) {
                    return `${response.status}, ${response.statusText}`;
                } else if (response.status !== 200) {
                    if (typeof response.data === 'string') return `${response.status}, ${response.data.toString().replace(/(\r)?\n/g, '; ')}`;
                    return `${response.status}, ${JSON.stringify(response.data)}`;
                }
            } else if (!!error.request) {
                let request = error.request;
                return error instanceof Error ? error.message : error;
            } else {
                return error instanceof Error ? error.message : error;
            }
        } catch (e) {
            return `500, ${e}`;
        }
    }

    /**
     *
     *
     * @param number [timeMs=500]
     * @return {*}  Promise<void>
     * @memberof BatchApi
     */
    public async delayTimeMs(timeMs: number = 500): Promise<void> {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), timeMs));
    }

    /**
     * get log api config
     *
     * @private
     * @param BatchApi.ILogBase logs
     * @return string msg
     * @memberof BatchApi
     */
    public getLogApiConfig(logs: BatchApi.ILogApiConfig): string {
        let msg: string = `
========== Api Config ==========

Setting api config for this task:

- url: ${logs.url}
- method: ${logs.method}
- body: ${logs.body}
- headers: ${logs.headers}
- timeout: ${logs.timeout} ms
- duration: ${logs.duration} ms
- is ignore https credential error: ${logs.isIgnoreHttpsCredentialError}
- is interrupt when error occurs: ${logs.isErrorInterrupt}
- intermediate delay time of each api: ${logs.delay} ms

========== Api Config ==========`;

        return msg;
    }

    /**
     * logs content
     *
     * @private
     * @param BatchApi.ILogApiResponse logs
     * @return string msg
     * @memberof BatchApi
     */
    public getLogApiResponse(logs: BatchApi.ILogApiResponse): string {
        let msg: string = `
Number of execution : ${logs.runCount}
Each time the api elapses : ${logs.apiElapsesMs} ms
Response message : ${logs.apiResponse}`;

        return msg;
    }

    /**
     * logs count
     *
     * @private
     * @param number totalTimeMs
     * @param number totalCounts
     * @param number successCounts
     * @param number failCounts
     * @param number averageTimeMs
     * @memberof BatchApi
     * @return string msg
     */
    public getLogsApiFinallyCount(totalTimeMs: number, totalCounts: number, successCounts: number, failCounts: number, averageTimeMs: number): string {
        let msg: string = `
========== Api Finally Count ==========

Total execution times: ${totalTimeMs} ms
Total execution count: ${totalCounts}
Number of successes: ${successCounts}
Number of failures: ${failCounts}
Average execution times: ${averageTimeMs} ms

========== Api Finally Count ==========`;

        return msg;
    }
}

export namespace BatchApi {
    /**
     * interface batch param
     *
     * @export
     * @interface IBatchParam
     * @memberof BatchApi
     */
    export interface IBatchParam {
        /**
         * @requires true
         */
        url: string;

        /**
         * @requires true
         */
        method: EMethod;

        /**
         * @requires true
         */
        duration: number;

        /**
         * @requires true post, put
         */
        body?: string;

        /**
         * @requires true post, put
         */
        headers?: IHeader[];

        /**
         * @unit 10000
         * @requires false
         * @default 10000ms
         */
        timeout?: number;

        /**
         * @requires false
         * @default false
         * @description 是否需要忽略https 憑證錯誤
         */
        isIgnoreHttpsCredentialError?: boolean;

        /**
         * @requires false
         * @default false
         * @description 發生錯誤時是否需要中斷任務
         */
        isErrorInterrupt?: boolean;

        /**
         * @requires false
         * @default 0
         * @description 每個api 中間delay 時間
         */
        delay?: number;
    }

    /**
     * interface log api config
     *
     * @export
     * @interface ILogConfig
     * @memberof BatchApi
     */
    export interface ILogApiConfig {
        url: string;
        method: BatchApi.EMethod;
        duration: number;
        body: string;
        headers: string;
        timeout: number;
        isIgnoreHttpsCredentialError: boolean;
        isErrorInterrupt: boolean;
        delay: number;
    }

    /**
     * interface log api response
     *
     * @export
     * @interface ILogApiResponse
     * @memberof BatchApi
     */
    export interface ILogApiResponse {
        apiResponse: string;
        apiElapsesMs: number;
        runCount: number;
    }

    /**
     * interface log api finally count
     *
     * @export
     * @interface ILogApiFinallyCount
     * @memberof BatchApi
     */
    export interface ILogApiFinallyCount {
        totalTimeMs: number;
        totalCounts: number;
        successCounts: number;
        failCounts: number;
        averageTimeMs: number;
    }

    /**
     * interface header
     *
     * @export
     * @interface IHeader
     * @memberof BatchApi
     */
    export interface IHeader {
        key: string;
        value: string;
    }

    /**
     * enum method
     *
     * @export
     * @enum EMethod
     * @memberof BatchApi
     */
    export enum EMethod {
        get = 'get',
        post = 'post',
        put = 'put',
        delete = 'delete',
    }
}
