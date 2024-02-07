import * as Mime from 'mime';

export namespace Base64 {
    /**
     * Convert base64 string to html src
     * @param base64
     */
    export function Convert2HtmlSrc(base64: string, extension: string): string {
        try {
            return `data:${Mime.getType(extension)};base64, ${base64}`;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get base64 data
     * @param data
     */
    export function GetData(data: string) {
        try {
            let regex = /data:.*;base64, */;

            return data.replace(regex, '');
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get base64 data mime type
     * @param data
     */
    export function GetContentType(data: string): string {
        try {
            let regex: RegExpMatchArray = data.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/i);

            if (!!regex && regex.length > 1) {
                return regex[1];
            }

            return undefined;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get base64 data info
     * @param data
     */
    export function GetInfo(data: string): { contentType: string; extension: string; type: 'text' | 'image' | 'application' | 'audio' | 'video' } {
        try {
            let type: string = GetContentType(data);
            if (!!type) {
                let extension: string = Mime.getExtension(type);

                return {
                    contentType: type,
                    extension: extension,
                    type: type.replace(/\/.*$/, '') as any,
                };
            }

            return undefined;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Convert Extension to ContentType
     * @param extension
     */
    export function Extension2ContentType(extension: string): string {
        try {
            let type: string = Mime.getType(extension);

            return type;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Convert ContentType to Extension
     * @param contentType
     */
    export function ContentType2Extension(contentType: string): string {
        try {
            let extension: string = Mime.getExtension(contentType);

            return extension;
        } catch (e) {
            throw e;
        }
    }
}
