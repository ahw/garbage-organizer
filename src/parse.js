import currency from 'currency.js';

const numberRegex = /(\S*\d+\S*)/;
const columnSeparatorRegex = /\t/;
export function splitToRows(str) {
    return str.split('\n');
}

export function splitToColumns(line) {
    if (columnSeparatorRegex.test(line)) {
        return line.split(columnSeparatorRegex);
    } else {
        return line.split(numberRegex).filter(chunk => numberRegex.test(chunk));
    }
}

export function parse(rawText) {
    const rows = splitToRows(rawText).map(splitToColumns);
    const cols = [];
    const maxCols = Math.max.apply(Math, rows.map(row => row.length));

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (typeof cols[j] === 'undefined') {
                cols[j] = [];
            }

            cols[j].push(rows[i][j]);
        }
    }


    // Reduce 'em
    const rowSummations = rows.filter(row => row.length).map(arr => {
        return arr.reduce((acc, curr) => currency(acc).add(curr), 0).value;
    });

    const colSummations = cols.filter(col => col.length).map(arr => {
        return arr.reduce((acc, curr) => currency(acc).add(curr), 0).value;
    });

    // [
    //  [ 123,    45,  456,  10000 ],
    //  [ 123,    45,  456,  10000 ],
    //  [ 123,    45,  456,  10000 ],
    //  [ 1000, 1000, 1000,   2000 ]
    // ]
    //
    //                          +----- rowSummations
    //                          |
    // [                        V
    //  [ 123,  undef, undef,  10000 ],
    //  [ 123,     45,   456,  10000 ],
    //  [ 123,     45,   456,  10000 ],
    //  [ 1000,  1000,  1000 ] <--- colSummations
    // ]
    const data = [];
    for (let i = 0; i <= rows.length; i++) {
        for (let j = 0; j <= maxCols; j++) {
            if (typeof data[i] === 'undefined') {
                data[i] = [];
            }

            if (i < rows.length && j < maxCols) {
                // Normal cell
                const value = typeof cols[j][i] !== 'undefined' && cols[j][i] !== "" ? cols[j][i] : 'N/A';
                data[i].push(value);
            } else if (i < rows.length && j === maxCols) {
                // Last column
                data[i].push(rowSummations[i]);
            } else if (i === rows.length && j < maxCols) {
                // Last row
                data[i].push(colSummations[j]);
            } else {
                // Last row and last columns
                data[i].push('LAST');
            }
        }
    }

    return {
        rows,
        maxCols,
        rowSummations,
        colSummations,
        data,
    };
}
