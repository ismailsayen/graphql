export function convertXPToReadable(xp) {
    if (xp < 1000) {
        return `${Math.round(xp)} B`;
    } else if (xp < 1000000) {
        const kb = (xp / 1000).toFixed(2);
        return `${Math.round(kb)} KB`;
    } else {
        const mb = (xp / 1000000).toFixed(2);
        return `${Math.round(mb)} MB`;
    }
}