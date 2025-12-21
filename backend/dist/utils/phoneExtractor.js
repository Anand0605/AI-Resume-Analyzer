"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPhone = extractPhone;
function extractPhone(text) {
    const phoneRegex = /(\+?\d{1,3}[\s-]?)?(\(?\d{3,4}\)?[\s-]?)?\d{3}[\s-]?\d{4}/g;
    const matches = text.match(phoneRegex);
    if (!matches)
        return null;
    // longest number is usually correct
    return matches.sort((a, b) => b.length - a.length)[0];
}
