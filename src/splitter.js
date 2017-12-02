const numberRegex = /(-?\d*\.?\d+)/g;
export function splitToRows(str) {
    return str.split('\n');
}

export function splitToColumns(line) {
    return line.split(numberRegex).filter(chunk => numberRegex.test(chunk));
}
