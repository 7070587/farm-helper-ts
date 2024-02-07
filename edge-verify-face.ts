/**
 * 不要碰
 */
import { Base64, FileService, PrintService } from './helpers';
import { Edge } from 'server-service-edge';
import * as Mime from 'mime';
import * as Rx from 'rxjs';
import HttpClient from 'axios';
import * as http from 'http';
import * as https from 'https';
import { EdgeNameSpace } from 'server-service-edge/dist/edges/namespace';

/**
 * 設定
 */
const VerifyFaceInterval = 1000;

const ImagePath = './resources/edge_faces';
//const ImagePath = 'C:\\Users\\min.hsieh\\Desktop';

const EdgeConfig: EdgeNameSpace.IConfig = {
    protocol: 'http',
    hostname: '172.22.28.21',
    port: 60752,
    account: 'Admin',
    password: 'Az123567!',
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

        let edge = new Edge();
        edge.setConfig = EdgeConfig;

        edge.Initialization();

        await edge.Login();
        let sessionId = edge.getSessionId;
        PrintService.log(`${edge.getBaseUrl} (${edge.getConfig.account}/${edge.getConfig.password}) connect success, sessionId = ${sessionId}`, new Error(), 'success');

        let sources = await edge.GetSources();

        let cameras = sources.map((value, index, array) => {
            if (value.type === EdgeNameSpace.ESourceType.tablet) return value.objectId;
            return value.name;
        });

        Rx.Observable.interval(VerifyFaceInterval)
            .delay(0)
            .startWith(0)
            .concatMap(async () => {
                try {
                    let url = `${edge.getBaseUrl}/frengine/simulate-camera`;

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
                                    sessionId: sessionId,
                                    imageBase64: Base64.Convert2HtmlSrc(image.toString('base64'), 'jpg'),
                                    options: {
                                        threshold: 0.95,
                                        hasReport: true,
                                        requestClient: 'fcs',
                                        sourceName: camera,
                                        location: camera,
                                    },
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
