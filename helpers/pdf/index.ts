import { DateTimeService } from '@/../helpers';

// PDF
import * as htmlToImage from 'html-to-image';
import JsPDF from 'jspdf';

import * as PDFNamespace from './namespace';

export { PDFNamespace };

export class PDF {
    /**
     * Exclusion Classes
     * @private
     * @type {string[]}
     * @memberof PDF
     */
    private _exclusionClasses: string[] = ['hidden-pdf'];

    /**
     * Get Exclusion Classes
     * @type {string[]}
     * @memberof PDF
     */
    public get exclusionClasses(): string[] {
        return this._exclusionClasses;
    }

    /**
     * Set Exclusion Classes
     * @memberof PDF
     */
    public set exclusionClasses(value: string[]) {
        this._exclusionClasses = value;
    }

    /**
     * Background Color
     * @private
     * @type {string}
     * @memberof PDF
     */
    private _backgroundColor: string = '#ffffff';

    /**
     * Get Background Color
     * @type {string}
     * @memberof PDF
     */
    public get backgroundColor(): string {
        return this._backgroundColor;
    }

    /**
     * Set Background Color
     * @memberof PDF
     */
    public set backgroundColor(value: string) {
        this._backgroundColor = value;
    }

    /**
     * Save PDF File
     * @description use id to get exported PDF element, and add 'hidden-pdf' class to hide elements not need exported
     * @async
     * @param {string} id
     * @param {string} filename
     * @return {*}  {Promise<void>}
     * @memberof PDF
     */
    public async save(id: string): Promise<void>;
    public async save(id: string, filename: string): Promise<void>;
    public async save(id: string, filename?: string): Promise<void> {
        try {
            filename = filename ?? `export_pdf_${DateTimeService.datetime2String(new Date(), 'YYYYMMDDHHmmss')}`;
            await this.export(id, filename);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Export
     * @async
     * @private
     * @param {string} id
     * @param {string} filename
     * @return {*}  {Promise<void>}
     * @memberof PDF
     */
    private async export(id: string, filename: string): Promise<void> {
        try {
            let target: HTMLElement = document.getElementById(id);

            if (!target) {
                throw `target PDF element not found`;
            }

            const filter = (node) => {
                let classLists: DOMTokenList = node.classList as DOMTokenList;

                if (!classLists) {
                    return true;
                }

                for (let classList of classLists) {
                    if (this._exclusionClasses.indexOf(classList) > -1) {
                        return false;
                    }
                }

                return true;
            };

            let canvas: HTMLCanvasElement = await new Promise<HTMLCanvasElement>((resolve, reject) => {
                try {
                    htmlToImage
                        .toCanvas(target, {
                            filter: filter,
                            backgroundColor: this._backgroundColor,
                            canvasWidth: target.clientWidth,
                            canvasHeight: target.clientHeight,
                        })
                        .then((canvas) => {
                            return resolve(canvas);
                        });
                } catch (error) {
                    return reject('error occurred when export to canvas');
                }
            });

            const A4Width: number = 592.28;
            const A4Height: number = 841.89;
            let contentWidth: number = canvas.width;
            let contentHeight: number = canvas.height;
            let pageHeight: number = (contentWidth / A4Width) * A4Height;
            let position: number = 0;
            let imgWidth: number = A4Width;
            let imgHeight: number = (A4Width / contentWidth) * contentHeight;
            let pageData = canvas.toDataURL('image/jpeg', 1);

            let PDF = new JsPDF('p', 'pt', 'a4');

            if (contentHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (contentHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    contentHeight -= pageHeight;
                    position -= A4Height;
                    if (contentHeight > 0) {
                        PDF.addPage();
                    }
                }
            }

            PDF.save(`${filename}.pdf`);
        } catch (e) {
            throw e;
        }
    }
}
