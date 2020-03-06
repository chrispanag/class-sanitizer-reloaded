import validator from 'validator';
import { createSanitizer, sanitize } from './core';

const emailSanitizer = createSanitizer((target, key) => {
    const email = target[key];
    if (typeof email === 'string') {
        target[key] = validator.normalizeEmail(email);
    }
});

const nestedSanitizer = createSanitizer((target, key) => {
    const nestedObject = target[key];
    if (nestedObject !== undefined) {
        sanitize(nestedObject);
    }
});

export function NormalizeEmail() {
    return emailSanitizer;
}

export function SanitizeNested() {
    return nestedSanitizer;
}
