/**
 * @class ServiceRegexClass
 */
export class ServiceRegexClass {
    private regexItem = {
        email: /^((?!\.)[\w\-_.]*[\w])(@\w+)(\.\w+(\.\w+)*[^.\W])$/i,
        url: /^((ws|wss|http|https):\/\/(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])(:[0-9]+)?(\/.*)?)$/i,
        rtsp: /^rtsp:\/\/(?:([^\s@\/]+?)[@])?([^\s\/:]+)(?:[:]([0-9]+))?(?:(\/[^\s?#]+)([?][^\s#]+)?)?([#]\S*)?$/i,
        hostname: /^((([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])(:[0-9]+)?)$/i,
        intNumber: /^(\-|\+)?\d+$/,
        floatNumber: /^(\-|\+)?[\d]*\.[\d]+$/,
        internationalPhone: /^\+{1}[0-9]+$/,
        ip: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        port: /^(0{1}|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
        headerKey: /^[-\w]*$/,
        macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
        jpg: /^[\w,\s-_()\&\.]+\.jpe?g$/i,
        png: /^[\w,\s-_()\&\.]+\.png$/i,
        pdf: /^[\w,\s-_()\&\.]+\.pdf$/i,
        xlsx: /^[\w,\s-_()\&\.]+\.xlsx$/i,
        htmlTag: /<[^>]*>/g,
        trueString: /^true$/i,
        nric4: /^[0-9a-zA-Z]{4}$/,
        account: /^[0-9a-zA-Z\-._]{1,1000}$/g, // 英數-._ (1-100)
        password: /^[0-9a-zA-Z\-._!@#$%&*:?]{1,1000}$/g, // 英數-._!@#$%&*:? (1-100)    param:string
        strongPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,1000}$/g, // 數字x1 小寫英文x1 大寫英文x1 (8-1000)
        brackets: /[\[\]\{\}]/gm,
        license: /^([A-Z]{5}-){4}[A-Z]{5}$/,
        cameraName: /^[0-9A-Z\-_]{2,}$/i,
    };

    /////////////////////////// Check Regex ///////////////////////////

    /**
     * Check email format
     * @description pass a string to check whether is in email format
     * @param {string} data a string need to confirm the format
     * @returns boolean
     */
    public isEmail(data: string): boolean {
        return new RegExp(this.regexItem.email).test(data);
    }

    /**
     * Get email regex
     * @description email regex
     * @returns /^((?!\.)[\w\-_.]*[\w])(@\w+)(\.\w+(\.\w+)*[^.\W])$/i
     */
    public email(): RegExp {
        return new RegExp(this.regexItem.email);
    }

    /**
     * Check url format
     * @description pass a string to check whether is in url format
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isUrl(data: string): boolean {
        return new RegExp(this.regexItem.url).test(data);
    }

    /**
     * Get url regex
     * @description url regex
     * @returns {RegExp} /^((ws|wss|http|https):\/\/(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])(:[0-9]+)?(\/.*)?)$/i
     */
    public url(): RegExp {
        return new RegExp(this.regexItem.url);
    }

    /**
     * Check rtsp format
     * @description pass a string to check whether is in rtsp format
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isRTSP(data: string): boolean {
        return new RegExp(this.regexItem.rtsp).test(data);
    }

    /**
     * Get rtsp regex
     * @description url regex
     * @returns {RegExp} /^rtsp:\/\/(?:([^\s@\/]+?)[@])?([^\s\/:]+)(?:[:]([0-9]+))?(?:(\/[^\s?#]+)([?][^\s#]+)?)?([#]\S*)?$/i
     */
    public rtsp(): RegExp {
        return new RegExp(this.regexItem.rtsp);
    }

    /**
     * Check hostname format
     * @description pass a string to check whether is in hostname format
     * @param data a string to check whether is in hostname format
     * @returns {boolean} boolean
     */
    public isHostname(data: string): boolean {
        return new RegExp(this.regexItem.hostname).test(data);
    }

    /**
     * Get hostname regex
     * @description hostname regex
     * @returns {RegExp} /^((([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])(:[0-9]+)?)$/i
     */
    public hostname(): RegExp {
        return new RegExp(this.regexItem.hostname);
    }

    /**
     * Check whether the input only contain number
     * @description pass a string to check whether is only composed by number
     * @param {string} data a string need to confirm the format
     * @param {{max:number; min: number}} range max >= target number; min <= target number; if max < min will help to swap
     * @returns {boolean} boolean
     * @throws range.max < range.min => RANGE_INVALID
     */
    public isInt(data: string): boolean;
    public isInt(data: string, range: { max: number; min: number }): boolean;
    public isInt(data: string, range: { max: number }): boolean;
    public isInt(data: string, range: { min: number }): boolean;
    public isInt(data: string, range?: { max: number; min: number }): boolean {
        let result = new RegExp(this.regexItem.intNumber).test(data);

        // validate
        if (result && range) {
            let target = parseInt(data);
            try {
                return this.isNumberInRange(target, range);
            } catch (error) {
                throw error;
            }
        }

        return result;
    }

    /**
     * Get intNumber regex
     * @description intNumber regex
     * @returns {RegExp} /^(\-|\+)?\d+$/
     */
    public intNumber(): RegExp {
        return new RegExp(this.regexItem.intNumber);
    }

    /**
     * Check whether the input only contain number
     * @description pass a string to check whether the input is float (have a dot .): ex. 0.1 or .1
     * @param {string} data a string need to confirm the format
     * @param {{max:number; min: number}} range max >= target number; min <= target number; if max < min will help to swap
     * @returns {boolean} boolean
     */
    public isFloat(data: string): boolean;
    public isFloat(data: string, range: { max: number; min: number }): boolean;
    public isFloat(data: string, range: { max: number }): boolean;
    public isFloat(data: string, range: { min: number }): boolean;
    public isFloat(data: string, range?: { max: number; min: number }): boolean {
        let result = new RegExp(this.regexItem.floatNumber).test(data);

        // validate
        if (result && range) {
            let target = parseFloat(data);
            try {
                return this.isNumberInRange(target, range);
            } catch (error) {
                throw error;
            }
        }

        return result;
    }

    /**
     * Get floatNumber regex
     * @description floatNumber regex
     * @returns {RegExp} /^(\-|\+)?[\d]*\.[\d]+$/
     */
    public floatNumber(): RegExp {
        return new RegExp(this.regexItem.floatNumber);
    }

    /**
     * Check international phone number format
     * @description pass a string to check whether is contain +{number}
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isInternationalPhone(data: string): boolean {
        return new RegExp(this.regexItem.internationalPhone).test(data);
    }

    /**
     * Get internation phone regex
     * @description internation phone regex
     * @returns {RegExp} /^\+{1}[0-9]+$/
     */
    public internationalPhone(): RegExp {
        return new RegExp(this.regexItem.internationalPhone);
    }

    /**
     * Check ip format
     * @description pass a string to check whether is in ip format
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isIp(data: string): boolean {
        return new RegExp(this.regexItem.ip).test(data);
    }

    /**
     * Get ip regex
     * @description ip regex
     * @returns {RegExp} /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
     */
    public ip(): RegExp {
        return new RegExp(this.regexItem.ip);
    }

    /**
     * Check port format
     * @description pass a string or number to check whether is from range 0 to 65535
     * @param {string | number} data a string or number need to confirm the format
     * @returns {boolean} boolean
     */
    public isPort(data: string | number): boolean {
        if (typeof data != 'number') {
            data = Number(data);
        }
        if (isNaN(data)) {
            return false;
        }
        if (data < 0 || data > 65535) {
            return false;
        }
        return true;
    }

    /**
     * Get port regex
     * @description port regex
     * @returns {RegExp} /^(0{1}|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
     */
    public port(): RegExp {
        return new RegExp(this.regexItem.port);
    }

    /**
     * Check header format
     * @description pass a string to check whether is a valid header key
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isHeaderKey(data: string): boolean {
        return new RegExp(this.regexItem.headerKey).test(data);
    }

    /**
     * Get headerKey regex
     * @description headerKey regex (reference to common used)
     * @returns {RegExp} /^[-\w]*$/
     */
    public headerKey(): RegExp {
        return new RegExp(this.regexItem.headerKey);
    }

    /**
     * Check Mac Address format
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isMacAddress(data: string): boolean {
        return new RegExp(this.regexItem.macAddress).test(data);
    }

    /**
     * Get Mac Address regex
     * @description mac address regex
     * @returns {RegExp} /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
     */
    public macAddress(): RegExp {
        return new RegExp(this.regexItem.macAddress);
    }

    /**
     * Check whether the input is latitude
     * @description pass a string or number to check whether is a valid latitude ( -90 <= value <= 90);
     * @param {string|number} data a string or number need to confirm
     * @returns {boolean} boolean
     */
    public isLatitude(data: string | number): boolean {
        let value = null;
        if (typeof data == 'string') {
            value = parseFloat(data);
        }
        if (typeof data == 'number') {
            value = data;
        }
        if (value == null) {
            return false;
        }
        if (isNaN(value)) {
            return false;
        }
        if (value < -90 || value > 90) {
            return false;
        }
        return true;
    }

    /**
     * Check whether the input is longitude
     * @description pass a string or number to check whether is a valid longitude ( -180 <= value <= 180);
     * @param {string|number} data a string or number need to confirm
     * @returns {boolean} boolean
     */
    public isLongitude(data: string | number): boolean {
        let value = null;
        if (typeof data == 'string') {
            value = parseFloat(data);
        }
        if (typeof data == 'number') {
            value = data;
        }
        if (value == null) {
            return false;
        }
        if (isNaN(value)) {
            return false;
        }
        if (value < -180 || value > 180) {
            return false;
        }
        return true;
    }

    /**
     * Check whether input is html tag
     * @description pass a string to check whether is a html tag
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isHtmlTag(data: string): boolean {
        return new RegExp(this.regexItem.htmlTag).test(data);
    }

    /**
     * Get html tag regex
     * @description html tag regex;
     * @returns {RegExp} /<[^>]*>/g
     */
    public htmlTag(): RegExp {
        return new RegExp(this.regexItem.htmlTag);
    }

    /**
     * Check whether input is a true string
     * @description pass a string to check whether the value is true; case insensitive
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isTrueString(data: string): boolean {
        return new RegExp(this.regexItem.trueString).test(data);
    }

    /**
     * Get true string regex
     * @description true string regex;
     * @returns {RegExp} /^true$/i
     */
    public trueString(): RegExp {
        return new RegExp(this.regexItem.trueString);
    }

    /**
     * Check whether input is a valid nric
     * @description pass a string to check whether the input is a 4 characters(number and letter only) string
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isNric4(data: string): boolean {
        return new RegExp(this.regexItem.nric4).test(data);
    }

    /**
     * Get nric regex
     * @description nric regex;
     * @returns {RegExp} /^[0-9a-zA-Z]{4}$/
     */
    public nric4(): RegExp {
        return new RegExp(this.regexItem.nric4);
    }

    /**
     * Check input with account format
     * @param data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isAccount(data: string): boolean {
        return new RegExp(this.regexItem.account).test(data);
    }

    /**
     * Get account regex
     * @description account regex; 'characters' or 'number' or '-._' and total length between 1-100
     * @returns {RegExp} /^[0-9a-zA-Z\-._]{1,1000}$/g
     */
    public account(): RegExp {
        return new RegExp(this.regexItem.account);
    }

    /**
     * Check input with password format
     * @param data a string need to confirm the format
     * @param exclude the string which also want to exclude
     */
    public isPassword(data: string);
    public isPassword(data: string, exclude: string);
    public isPassword(data: string, exclude?: string): boolean {
        // regexItem test first
        if (!new RegExp(this.regexItem.password).test(data)) {
            return false;
        }

        // exclude
        if (exclude) {
            return data.indexOf(exclude) < 0;
        }

        return true;
    }

    /**
     * Get password regex
     * @description password regex; 'characters' or 'number' or '-._!@#$%&*:?' and total length between 1-100
     * @returns {RegExp} /^[0-9a-zA-Z\-._!@#$%&*:?]{1,1000}$/g
     */
    public password(): RegExp {
        return new RegExp(this.regexItem.password);
    }

    /**
     * Check input with password format
     * @param data a string need to confirm the format
     * @param exclude the string which also want to exclude
     */
    public isStrongPassword(data: string);
    public isStrongPassword(data: string, exclude: string);
    public isStrongPassword(data: string, exclude?: string): boolean {
        // regexItem test first
        if (!new RegExp(this.regexItem.strongPassword).test(data)) {
            return false;
        }

        // exclude
        if (exclude) {
            return data.indexOf(exclude) < 0;
        }

        return true;
    }

    /**
     * Get strong password regex
     * @description password regex; at least one uppercase character, one lowercase character, one number, one '-._!@#$%&*:?' and total length between 8-100
     * @returns {RegExp} /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,1000}$/g
     */
    public strongPassword(): RegExp {
        return new RegExp(this.regexItem.strongPassword);
    }

    /**
     * Check input has brackets
     * @description check input has '{', '}', '[' or ']' characters
     * @param data a string need to confirm the format
     */
    public hasBrackets(data: string): boolean {
        return new RegExp(this.regexItem.brackets).test(data);
    }

    /**
     * Get brackets regex
     * @description brackets regex; to check whether has '{', '}', '[' or ']' characters
     * @returns {RegExp} /[\[\]\{\}]/gm
     */
    public brackets(): RegExp {
        return new RegExp(this.regexItem.brackets);
    }

    /**
     * Check input is valid license format
     * @description upper case only ex. ABCDE-ABCDE-ABCDE-ABCDE-ABCDE
     * @param data a string need to confirm the format
     */
    public isLicense(data: string) {
        return new RegExp(this.regexItem.license).test(data);
    }

    /**
     * Get license regex
     * @description upper case only ex. ABCDE-ABCDE-ABCDE-ABCDE-ABCDE
     * @returns {RegExp} /^([A-Z]{5}-){4}[A-Z]{5}$/
     */
    public license(): RegExp {
        return new RegExp(this.regexItem.license);
    }

    /**
     * Check input is valid camera name
     * @description characters, number or _- only. string length should more than 2
     * @param data a string need to confirm the format
     */
    public isCameraName(data: string) {
        return new RegExp(this.regexItem.cameraName).test(data);
    }

    /**
     * Get cameraName regex
     * @description characters, number or _- only. string length should more than 2
     * @returns {RegExp} /^[0-9A-Z\-_]{2,}$/i
     */
    public cameraName(): RegExp {
        return new RegExp(this.regexItem.cameraName);
    }

    ////////// file extension ///////////

    /**
     * Check file extension: jpg/jpeg
     * @description pass a string to check whether is xxx.jpg or xxx.jpeg; case insensitive
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isExtensionJpg(data: string): boolean {
        return new RegExp(this.regexItem.jpg).test(data);
    }

    /**
     * Get jpg regex
     * @description jpg regex
     * @returns {RegExp} /^[\w,\s-_()\&\.]+\.jpe?g$/i
     */
    public extensionJpg(): RegExp {
        return new RegExp(this.regexItem.jpg);
    }

    /**
     * Check file extension: png
     * @description pass a string to check whether is xxx.png; case insensitive
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isExtensionPng(data: string): boolean {
        return new RegExp(this.regexItem.png).test(data);
    }

    /**
     * Get png regex
     * @description png regex
     * @returns {RegExp} /^[\w,\s-_()\&\.]+\.png$/i
     */
    public extensionPng(): RegExp {
        return new RegExp(this.regexItem.png);
    }

    /**
     * Check file extension: pdf
     * @description pass a string to check whether is xxx.pdf; case insensitive
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isExtensionPdf(data: string): boolean {
        return new RegExp(this.regexItem.pdf).test(data);
    }

    /**
     * Get pdf regex
     * @description pdf regex
     * @returns {RegExp} /^[\w,\s-_()\&\.]+\.pdf$/i
     */
    public extensionPdf(): RegExp {
        return new RegExp(this.regexItem.pdf);
    }

    /**
     * Check file extension: xlsx
     * @description pass a string to check whether is xxx.xlsx; case insensitive
     * @param {string} data a string need to confirm the format
     * @returns {boolean} boolean
     */
    public isExtensionXlsx(data: string): boolean {
        return new RegExp(this.regexItem.xlsx).test(data);
    }

    /**
     * Get xlsx regex
     * @description xlsx regex;
     * @returns {RegExp} /^[\w,\s-_()\&\.]+\.xlsx$/i
     */
    public extensionXlsx(): RegExp {
        return new RegExp(this.regexItem.xlsx);
    }

    /**
     * Trim
     * @param data
     */
    public trim(data: any): any {
        let result = data;
        switch (typeof data) {
            case 'string':
                result = data.trim();
                break;
            case 'object':
                if (data == null) {
                    break;
                }
                if (data.length > 0) {
                    for (let i in data) {
                        data[i] = this.trim(data[i]);
                    }
                } else {
                    let tempKeys = Object.keys(data);
                    for (let key of tempKeys) {
                        data[key] = this.trim(data[key]);
                    }
                }
                break;
            case 'boolean':
            case 'number':
            case 'function':
            case 'undefined':
            default:
                break;
        }
        return result;
    }

    /**
     * Check input is between indicated number range
     * @description pass a number to check whether is in indicated range; [options] can pass range
     * @param {string} target a number need to confirm the range
     * @param {{max:number; min: number}} range max >= target number; min <= target number; if max < min will help to swap
     * @returns {boolean} boolean
     */
    public isNumberInRange(target: number, range: { max: number; min: number }): boolean;
    public isNumberInRange(target: number, range: { min: number }): boolean;
    public isNumberInRange(target: number, range: { max: number }): boolean;
    public isNumberInRange(target: number, range: { max?: number; min?: number }): boolean {
        if (range.max != null && range.min != null) {
            // adjust range
            if (range.max < range.min) {
                // swap max and min
                let { max, min } = range;
                range.max = min;
                range.min = max;
            }
            return target <= range.max && target >= range.min;
        } else if (range.min != null) {
            return target >= range.min;
        } else {
            return target <= range.max;
        }
    }
}

/**
 * @instance ServiceRegexClass
 */
export const ServiceRegex = new ServiceRegexClass();
