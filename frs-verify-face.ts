/**
 * 不要碰
 */
import { FileService, PrintService } from './helpers';
import * as Mime from 'mime';
import * as Rx from 'rxjs';
import HttpClient from 'axios';
import * as http from 'http';
import * as https from 'https';

/**
 * 設定
 */
const VerifyFaceInterval = 1000;

const ImagePath = './resources/frs_faces';
//const ImagePath = 'C:\\Users\\min.hsieh\\Desktop';

const FRSConfig: object = {
    protocol: 'http',
    hostname: '172.22.28.162',
    port: 80,
    account: 'Min1',
    password: '123456',
};

/**
 * 不要碰
 */
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

/**
 * 不要碰
 */
setTimeout(async () => {
    try {
        let images = FileService.readFolder(ImagePath)
            .filter((n) => {
                let mime = Mime.getType(n.substr(n.lastIndexOf('.') + 1));
                if (!mime) return false;

                return mime.indexOf('image') > -1;
            })
            .map((n) => FileService.readFile(`${ImagePath}\\${n}`));

        let baseUrl = `${FRSConfig['protocol']}://${FRSConfig['hostname']}:${FRSConfig['port']}`;

        let sessionId = await Login(baseUrl, FRSConfig['account'], FRSConfig['password']);
        PrintService.log(`${baseUrl} (${FRSConfig['account']}/${FRSConfig['password']}) connect success, sessionId = ${sessionId}`, new Error(), 'success');

        let sources = await GetSources(baseUrl, sessionId);

        let cameras = sources.filter((n, i) => sources.indexOf(n) === i).filter((n) => n !== 'default_source_id');

        Rx.Observable.interval(VerifyFaceInterval)
            .delay(0)
            .startWith(0)
            .concatMap(async () => {
                try {
                    let url = `${baseUrl}/frs/cgi/verifyface`;

                    let image = images[Math.floor(Math.random() * images.length)];
                    if (!image) return;
                    let camera = cameras[Math.floor(Math.random() * cameras.length)];
                    if (!camera) return;

                    let result: object = await new Promise<object>((resolve, reject) => {
                        try {
                            HttpClient({
                                method: 'post',
                                url: url,
                                responseType: 'json',
                                timeout: 10000,
                                httpAgent: httpAgent,
                                httpsAgent: httpsAgent,
                                data: {
                                    session_id: sessionId,
                                    target_score: 0.9,
                                    request_client: 'fcs',
                                    action_enable: 0,
                                    source_id: camera,
                                    location: camera,
                                    image: image.toString('base64'),
                                },
                            })
                                .then((response) => {
                                    let data: object = response.data;
                                    return resolve(data);
                                })
                                .catch((error) => {
                                    if (!!error.response) {
                                        let response = error.response;
                                        if (response.status === 404) {
                                            return reject(`${response.status}, ${response.statusText}`);
                                        } else if (response.status !== 200) {
                                            if (typeof response.data === 'string') return reject(`${response.status}, ${response.data.toString().replace(/(\r)?\n/g, '; ')}`);
                                            return reject(`${response.status}, ${JSON.stringify(response.data)}`);
                                        }
                                    } else if (!!error.request) {
                                        let request = error.request;
                                        return reject(error instanceof Error ? error.message : error);
                                    } else {
                                        return reject(error instanceof Error ? error.message : error);
                                    }
                                });
                        } catch (e) {
                            return reject(e);
                        }
                    }).catch((e) => {
                        throw e;
                    });
                } catch (e) {
                    PrintService.log(e, new Error(), 'error');
                }
            })
            .subscribe();
    } catch (e) {
        PrintService.log(e, new Error(), 'error');
    }
}, 0);

async function Login(baseUrl: string, account: string, password: string): Promise<string> {
    try {
        let url: string = `${baseUrl}/users/login`;

        let result: object = await new Promise<object>((resolve, reject) => {
            try {
                HttpClient({
                    method: 'post',
                    url: url,
                    responseType: 'json',
                    timeout: 10000,
                    httpAgent: httpAgent,
                    httpsAgent: httpsAgent,
                    data: {
                        username: account,
                        password: password,
                    },
                })
                    .then((response) => {
                        let data: object = response.data;
                        return resolve(data);
                    })
                    .catch((error) => {
                        if (!!error.response) {
                            let response = error.response;
                            if (response.status === 404) {
                                return reject(`${response.status}, ${response.statusText}`);
                            } else if (response.status !== 200) {
                                if (typeof response.data === 'string') return reject(`${response.status}, ${response.data.toString().replace(/(\r)?\n/g, '; ')}`);
                                return reject(`${response.status}, ${JSON.stringify(response.data)}`);
                            }
                        } else if (!!error.request) {
                            let request = error.request;
                            return reject(error instanceof Error ? error.message : error);
                        } else {
                            return reject(error instanceof Error ? error.message : error);
                        }
                    });
            } catch (e) {
                return reject(e);
            }
        }).catch((e) => {
            throw e;
        });

        let sessionId = result['sessionId'];

        return sessionId;
    } catch (e) {
        throw e;
    }
}

async function GetSources(baseUrl: string, sessionId: string): Promise<string[]> {
    try {
        let url: string = `${baseUrl}/devices?sessionId=${encodeURIComponent(sessionId)}`;

        let result: object = await new Promise<object>((resolve, reject) => {
            try {
                HttpClient({
                    method: 'get',
                    url: url,
                    responseType: 'json',
                    timeout: 10000,
                    httpAgent: httpAgent,
                    httpsAgent: httpsAgent,
                })
                    .then((response) => {
                        let data: object = response.data;
                        return resolve(data);
                    })
                    .catch((error) => {
                        if (!!error.response) {
                            let response = error.response;
                            if (response.status === 404) {
                                return reject(`${response.status}, ${response.statusText}`);
                            } else if (response.status !== 200) {
                                if (typeof response.data === 'string') return reject(`${response.status}, ${response.data.toString().replace(/(\r)?\n/g, '; ')}`);
                                return reject(`${response.status}, ${JSON.stringify(response.data)}`);
                            }
                        } else if (!!error.request) {
                            let request = error.request;
                            return reject(error instanceof Error ? error.message : error);
                        } else {
                            return reject(error instanceof Error ? error.message : error);
                        }
                    });
            } catch (e) {
                return reject(e);
            }
        }).catch((e) => {
            throw e;
        });

        return result['fcs_settings'].map((n) => n['video_source_sourceid']);
    } catch (e) {
        throw e;
    }
}
