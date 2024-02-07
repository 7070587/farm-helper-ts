import * as Rx from 'rxjs';
import * as RxOperator from 'rxjs/operators';

/**
 * Ws
 */
export class Ws {
    /**
     * Websocket
     */
    private _websocket: WebSocket = undefined;

    /**
     * Is Connected
     */
    private _isConnected: boolean = false;

    /**
     * Get Is Connected
     */
    public get isConnected(): boolean {
        return this._isConnected;
    }

    /**
     * Url
     */
    private _url: string = '';

    /**
     * Get Url
     * @returns string
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Set Url
     * @param value string
     */
    public set url(value: string) {
        this._url = value;
    }

    /**
     * On Message Subject
     */
    private _message$: Rx.Subject<any> = new Rx.Subject();

    /**
     * Get On Message Subject
     * @returns Rx.Subject<any>
     */
    public get message$(): Rx.Subject<any> {
        return this._message$;
    }

    /**
     * On Error Subject
     */
    private _error$: Rx.Subject<Event> = new Rx.Subject();

    /**
     * Get On Error Subject
     * @returns Rx.Subject<Event>
     */
    public get error$(): Rx.Subject<Event> {
        return this._error$;
    }

    /**
     * On Close Subject
     */
    private _close$: Rx.Subject<CloseEvent> = new Rx.Subject();

    /**
     * Get On Close Subject
     * @returns Rx.Subject<CloseEvent>
     */
    public get close$(): Rx.Subject<CloseEvent> {
        return this._close$;
    }

    /**
     * Connect
     * @async
     */
    public async Connect(): Promise<void> {
        try {
            await this.Close();

            let isConnecting: boolean = false;

            await new Promise<void>((resolve, reject) => {
                try {
                    this._websocket = new WebSocket(this._url);

                    this._websocket.onopen = async (e: Event): Promise<void> => {
                        this._isConnected = true;
                        isConnecting = true;

                        return resolve();
                    };

                    this._websocket.onmessage = async (e: MessageEvent): Promise<void> => {
                        try {
                            this._message$.next(JSON.parse(e.data));
                        } catch (e) {
                            this._message$.next(e.data);
                        }
                    };

                    this._websocket.onerror = async (e: Event): Promise<void> => {
                        if (!isConnecting) {
                            return reject(e);
                        } else {
                            this._error$.next(e);
                        }
                    };

                    this._websocket.onclose = async (e: CloseEvent): Promise<void> => {
                        this._isConnected = false;

                        this._close$.next(e);
                    };
                } catch (e) {
                    return reject(e);
                }
            }).catch((e) => {
                throw e;
            });
        } catch (e) {
            throw e;
        }
    }

    /**
     * Close
     * @async
     */
    public async Close(): Promise<void> {
        try {
            if (!!this._websocket) {
                if (this._isConnected) {
                    await new Promise<void>((resolve, reject) => {
                        try {
                            this._error$.pipe(RxOperator.take(1)).subscribe({ next: (x) => reject(x) });
                            this._close$.pipe(RxOperator.take(1)).subscribe({ next: (x) => resolve() });

                            this._websocket.close();
                        } catch (e) {
                            return reject(e);
                        }
                    }).catch((e) => {
                        throw e;
                    });
                }

                this._websocket = undefined;
            }

            this._isConnected = false;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Dispose
     * @async
     */
    public async Dispose(): Promise<void> {
        try {
            this._message$.complete();
            this._error$.complete();
            this._close$.complete();

            await this.Close();
        } catch (e) {
            throw e;
        }
    }

    /**
     * Send
     * @param message string
     */
    public Send(message: string): void {
        try {
            if (!this._isConnected) {
                throw `${this._url} was not connected`;
            }

            this._websocket.send(message);
        } catch (e) {
            throw e;
        }
    }
}
