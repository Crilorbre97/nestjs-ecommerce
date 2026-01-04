// src/common/log-sanitizer.ts
const SENSITIVE_KEYS = [
    'password'
];

export function sanitize(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(sanitize);
    }

    const sanitized = { ...obj };

    for (const key of Object.keys(sanitized)) {
        if (SENSITIVE_KEYS.includes(key)) {
            sanitized[key] = '[REDACTED]';
        } else if (typeof sanitized[key] === 'object') {
            sanitized[key] = sanitize(sanitized[key]);
        }
    }

    return sanitized;
}