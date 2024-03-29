import * as Canvas from 'canvas';

export namespace Draw {
    /**
     *
     */
    export interface ISize {
        width: number;
        height: number;
    }

    /**
     *
     */
    export interface ILocation extends ISize {
        x: number;
        y: number;
    }

    /**
     *
     */
    export interface IRect extends ILocation {
        color: string;
        lineWidth: number;
        isFill: boolean;
    }

    /**
     *
     * @param buffer
     */
    async function LoadImage(buffer: Buffer): Promise<Canvas.Image> {
        try {
            let size: Canvas.Image = await new Promise<Canvas.Image>((resolve, reject) => {
                let image: Canvas.Image = new Canvas.Image();
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = (e) => {
                    return reject(e);
                };
                image.src = buffer;
            }).catch((e) => {
                throw e;
            });

            return size;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     * @param buffer
     */
    export async function ImageSize(buffer: Buffer): Promise<ISize> {
        try {
            let image: Canvas.Image = await LoadImage(buffer);

            let size: ISize = {
                width: image.width,
                height: image.height,
            };

            return size;
        } catch (e) {
            throw e;
        }
    }

    /**
     *
     * @param rects
     * @param size
     * @param buffer
     */
    export async function Rectangle(rects: IRect[], size: ISize): Promise<Buffer>;
    export async function Rectangle(rects: IRect[], buffer: Buffer): Promise<Buffer>;
    export async function Rectangle(rects: IRect[], source: ISize | Buffer): Promise<Buffer> {
        try {
            let canvas = Canvas.createCanvas(0, 0);
            let ctx = canvas.getContext('2d');

            if (source instanceof Buffer) {
                let image: Canvas.Image = await LoadImage(source);

                canvas.width = image.width;
                canvas.height = image.height;

                ctx.drawImage(image, 0, 0);
            } else {
                canvas.width = source.width;
                canvas.height = source.height;
            }

            for (let rect of rects) {
                ctx.beginPath();
                ctx.rect(rect.x, rect.y, rect.width, rect.height);

                if (rect.isFill) {
                    ctx.fillStyle = rect.color;
                    ctx.fill();
                } else {
                    ctx.lineWidth = rect.lineWidth;
                    ctx.strokeStyle = rect.color;
                    ctx.stroke();
                }
            }

            if (source instanceof Buffer) {
                return canvas.toBuffer('image/jpeg', { quality: 1 });
            } else {
                return canvas.toBuffer();
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * Image resize
     * @param buffer
     * @param size
     * @param isFill
     * @param isPng png | jpg
     */
    export async function Resize(buffer: Buffer, max: number, isFill: boolean, isPng: boolean): Promise<Buffer>;
    export async function Resize(buffer: Buffer, size: ISize, isFill: boolean, isPng: boolean): Promise<Buffer>;
    export async function Resize(buffer: Buffer, target: ISize | number, isFill: boolean, isPng: boolean): Promise<Buffer> {
        try {
            let canvas = Canvas.createCanvas(0, 0);
            let ctx = canvas.getContext('2d');

            let image: Canvas.Image = await LoadImage(buffer);

            let size: ISize = undefined;
            let score: number = undefined;
            if (typeof target === 'number') {
                if (image.width > image.height) {
                    score = target / image.width;
                    size = {
                        width: target,
                        height: image.height * score,
                    };
                } else {
                    score = target / image.height;
                    size = {
                        width: image.width * score,
                        height: target,
                    };
                }
            } else {
                size = target;

                let score1: number = size.width / image.width;
                let score2: number = size.height / image.height;

                score = score1 > score2 ? score2 : score1;
            }

            let width: number = image.width * score;
            let height: number = image.height * score;
            let x: number = 0;
            let y: number = 0;

            if (isFill) {
                canvas.width = size.width;
                canvas.height = size.height;

                x = width === size.width ? 0 : (size.width - width) / 2;
                y = height === size.height ? 0 : (size.height - height) / 2;
            } else {
                canvas.width = width;
                canvas.height = height;
            }

            ctx.drawImage(image, x, y, width, height);

            return isPng ? canvas.toBuffer('image/png') : canvas.toBuffer('image/jpeg');
        } catch (e) {
            throw e;
        }
    }

    /**
     * Resize to square
     * @param buffer
     * @param size
     */
    export async function Resize2Square(buffer: Buffer, size: number): Promise<Buffer> {
        try {
            let canvas = Canvas.createCanvas(0, 0);
            let ctx = canvas.getContext('2d');

            let image: Canvas.Image = await LoadImage(buffer);

            canvas.width = size;
            canvas.height = size;

            let width: number = image.width > image.height ? size : (image.width * size) / image.height;
            let height: number = image.height > image.width ? size : (image.height * size) / image.width;
            let x: number = image.width > image.height ? 0 : (size - width) / 2;
            let y: number = image.height > image.width ? 0 : (size - height) / 2;

            ctx.drawImage(image, x, y, width, height);

            return canvas.toBuffer('image/png');
        } catch (e) {
            throw e;
        }
    }

    /**
     * Cut image
     * @param locations
     * @param buffer
     * @param quality
     */
    export async function CutImage(locations: ILocation[], buffer: Buffer, quality: number = 1): Promise<Buffer[]> {
        try {
            let buffers: Buffer[] = [];

            let canvas = Canvas.createCanvas(0, 0);
            let ctx = canvas.getContext('2d');

            let image: Canvas.Image = await LoadImage(buffer);

            locations.forEach((value, index, array) => {
                canvas.width = value.width;
                canvas.height = value.height;

                ctx.drawImage(image, value.x, value.y, value.width, value.height, 0, 0, value.width, value.height);

                buffers.push(canvas.toBuffer('image/jpeg', { quality: quality }));
            });

            return buffers;
        } catch (e) {
            throw e;
        }
    }
}
