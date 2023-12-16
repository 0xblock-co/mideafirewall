/* eslint-disable no-undef */
interface FieldOption {
    label: string;
    value: string;
    isDisabled?: boolean;
}

export default class CommonUtility {
    static isNotEmpty(item: any): boolean {
        return item !== undefined && item !== null && item !== "" && item.length !== 0;
    }
    static isNotEmptyObject(item: any): boolean {
        return Object.keys(item).length !== 0 && item.constructor === Object;
    }

    static truncateString(text: string, ellipsisString: number): string {
        return (text || "").length > ellipsisString ? text.substring(0, ellipsisString) + "..." : text;
    }

    static numberWithCommas(x: number): string {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static doesKeyExist(obj: any, key: string): boolean {
        return typeof obj === "object" && obj !== null && key in obj;
    }

    static decimalWithCommas(x: number, decimal = 2): string {
        if (Number.isNaN(x)) {
            return "-";
        }
        if (decimal) {
            const decimalValue = Math.round((x + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
            let formattedNumber = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: decimal,
            });
            return formattedNumber.format(Number(decimalValue));
        }
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static objectToParams(obj: { [key: string]: any }): string {
        let str = "";
        for (const key in obj) {
            if (obj[key] !== undefined && obj[key] !== null) {
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(obj[key]);
            }
        }
        return str;
    }

    static toTitleCase(phrase: string): string {
        return phrase
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    static roundNumber(num: number, decimal = 2): number | string {
        return !isNaN(num) ? Math.round((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal) : "-";
    }

    static removeStartingComma(inputString: string): string {
        if (inputString.startsWith(",")) {
            return inputString.slice(1);
        }
        return inputString;
    }

    static copyToClipboard(toSave: string): void {
        const textArea = document.createElement("textarea");
        textArea.value = toSave;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }

    static isValidArray<T>(data: T[]): boolean {
        return data && Array.isArray(data) && data.length > 0;
    }

    static removeWhiteSpace(sentence: string): string {
        return sentence.replace(/\s/g, "");
    }

    static addDecimalCommas(number: number): string {
        const numberString = number.toString();

        const [integerPart, decimalPart] = numberString.split(".");

        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (decimalPart) {
            return `${integerWithCommas}.${decimalPart}`;
        } else {
            return integerWithCommas;
        }
    }

    static convertToOptions<T extends Record<string, any>>(
        originalArray: T[],
        preparedKey: { label: keyof T; value: keyof T; isDisabled?: keyof T } = { label: "label" as keyof T, value: "value" as keyof T, isDisabled: "isDisabled" as keyof T }
    ): FieldOption[] {
        return originalArray.map((item) => ({
            label: item[preparedKey.label] as string,
            value: item[preparedKey.value] as string,
            isDisabled: preparedKey.isDisabled ? (item[preparedKey.isDisabled] as boolean) : false,
        }));
    }

    static replaceApiSecretAndFilters(inputString: string, email: string, newApiSecret: string, newSelectedFilters: string, jwt_token): string {
        const replacedApiSecret1 = inputString.replace(/{userEmail}/g, email);
        const replacedApiSecret = replacedApiSecret1.replace(/{api_secret}/g, newApiSecret);
        const replacedFilters = replacedApiSecret.replace(/{selectedFilters}/g, `${newSelectedFilters}`);
        const replacedFiltersFinal = replacedFilters.replace(/{jwt_token}/g, `${jwt_token}`);
        return replacedFiltersFinal;
    }
}
