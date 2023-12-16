class LocalStorageUtil {
    static isWindowUndefined = typeof window === "undefined";

    static getValue(key) {
        if (LocalStorageUtil.isWindowUndefined) {
            return null;
        }

        try {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
            return null;
        } catch (error) {
            console.error(`Error parsing localStorage value for key '${key}':`, error);
            return null;
        }
    }

    static setValue(key, value) {
        if (LocalStorageUtil.isWindowUndefined) {
            return;
        }

        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting localStorage value for key '${key}':`, error);
        }
    }

    static deleteValue(key) {
        if (LocalStorageUtil.isWindowUndefined) {
            return;
        }

        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error deleting localStorage value for key '${key}':`, error);
        }
    }

    static deleteValues(keys) {
        if (LocalStorageUtil.isWindowUndefined) {
            return;
        }

        try {
            keys.forEach((key) => localStorage.removeItem(key));
        } catch (error) {
            console.error("Error deleting localStorage values:", error);
        }
    }
}

// Example Usage
// const value = LocalStorageUtil.getValue('myKey');
// LocalStorageUtil.setValue('myKey', { some: 'value' });
// LocalStorageUtil.deleteValue('myKey');
// LocalStorageUtil.deleteValues(['key1', 'key2']);
