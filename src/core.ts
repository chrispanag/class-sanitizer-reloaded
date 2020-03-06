type ValidatorFunction<T> = (object: T) => void;

const sanitizers: Set<ValidatorFunction<any>> = new Set();

type Key = string | symbol;

export function createSanitizer(
    sanitizerFunction: (target: any, key: Key) => void
): PropertyDecorator {
    const map: Map<any, Array<Key>> = new Map();
    const validator = (object: object) => {
        const keys = map.get(Object.getPrototypeOf(object));
        if (keys) {
            for (const key of keys) {
                sanitizerFunction(object, key);
            }
        }
    };
    return (target, propertyKey: Key) => {
        let keys: Array<Key> | undefined = map.get(target);
        if (!keys) {
            keys = [];
            map.set(target, keys);
        }
        keys.push(propertyKey);
        sanitizers.add(validator);
    };
}

export function sanitize<T>(object: T) {
    for (const s of sanitizers.keys()) {
        s(object);
    }
}
