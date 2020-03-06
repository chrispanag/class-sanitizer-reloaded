import validator from 'validator';
import { createSanitizer, sanitize } from './core';

const emailSanitizer = createSanitizer((target, key) => {
    const email = target[key];
    if (typeof email === 'string') {
        target[key] = validator.normalizeEmail(email);
    }
});

export function NormalizeEmail() {
    return emailSanitizer;
}

const nestedSanitizer = createSanitizer((target, key) => {
    const nestedObject = target[key];
    if (nestedObject !== undefined) {
        sanitize(nestedObject);
    }
});

export function SanitizeNested() {
    return nestedSanitizer;
}

const escapeSanitizer = createSanitizer((target, key) => {
    const stringToEscape = target[key];
    if (typeof stringToEscape === 'string') {
        target[key] = validator.escape(stringToEscape);
    }
});

export function Escape() {
    return escapeSanitizer;
}

const toDateSanitizer = createSanitizer((target, key) => {
    const stringToDate = target[key];
    if (typeof stringToDate === 'string') {
        target[key] = validator.toDate(stringToDate);
    }
});

export function ToDate() {
    return toDateSanitizer;
}

const toFloatSanitizer = createSanitizer((target, key) => {
    const stringToFloat = target[key];
    if (typeof stringToFloat === 'string') {
        target[key] = validator.toFloat(stringToFloat);
    }
});

export function ToFloat() {
    return toFloatSanitizer;
}