
export default function blacklist(src, ...args) {
    let copy = {};
    const ignore = Array.from(args);

    for (const key in src) {
        if (ignore.indexOf(key) === -1) {
            copy[key] = src[key];
        }
    }

    return copy;
}
