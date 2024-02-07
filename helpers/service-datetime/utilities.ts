class UtilitiesClass {
    /**
     * Add indicated leading character
     * @param {string} str original string
     * @param {string} char the value for leading character
     * @param {number} length the min length of the result string
     * @returns string
     */
    padLeft(str: string, char: string, length: number): string {
        while (str.length < length) {
            str = `${char}${str}`;
        }
        return str;
    }

    /**
     * Convert string array to RegExp
     * @param  {string[][]} array
     * @returns regex
     */
    array2RegExp(...array: string[][]): RegExp {
        let strs = [];
        strs = strs.concat(...array);

        let regex = '';
        for (let str of strs) {
            regex += `${str}|`;
        }
        regex = regex.replace(/\|$/, '');

        return new RegExp(regex, 'g');
    }
}

/**
 * @instance UtilitiesClass
 */
export const ServiceUtilities = new UtilitiesClass();
