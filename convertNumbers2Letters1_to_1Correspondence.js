// (Source: https://stackoverflow.com/questions/11089399/count-with-a-b-c-d-instead-of-0-1-2-3-with-javascript/11090169#11090169)

// Here's a simple recursive function to convert the numbers to letters.
// It's one-based, so 1 is A, 26 is Z, 27 is AA.
function toLetters(num) {
    "use strict";
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetters(pow) + out : out;
}

// Here's a matching function to convert the strings back to numbers:
function fromLetters(str) {
    "use strict";
    var out = 0, len = str.length, pos = len;
    while (--pos > -1) {
        out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - 1 - pos);
    }
    return out;
}
