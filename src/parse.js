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

export function inferDataType(str) {
    const currencyRegex = /^\s*\$\d+\.?\d*$/; // Use this to infer the data type of a column and adjust text-align accordingly
    const isInt = isNaN(parseInt(str)) === false;
    const isFloat = isNaN(parseFloat(str)) === false;
    const isCurrency = currencyRegex.test(str);
    // console.log(`"${str}" isInt=${isInt} isFloat=${isFloat} isCurrency=${isCurrency}`);
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

    // What we're aiming for:
    //
    //                          +----- rowSummations
    //                          |
    // [                        V
    //  [ 123,  undef, undef,  10000  ],
    //  [ 123,     45,   456,  10000  ],
    //  [ 123,     45,   456,  10000  ],
    //  [ 1000,  1000,  1000,  "LAST" ] <--- colSummations
    // ]
    const data = [];
    const columnDataTypes = [];
    const rowDataTypes = [];
    for (let i = 0; i <= rows.length; i++) {
        for (let j = 0; j <= maxCols; j++) {
            let value = 'N/A';
            if (typeof data[i] === 'undefined') {
                data[i] = [];
            }

            if (i < rows.length && j < maxCols) {
                // Normal cell
                if (typeof cols[j][i] !== 'undefined' && cols[j][i] !== "") {
                    value = cols[j][i];
                }
            } else if (i < rows.length && j === maxCols) {
                // Last column
                value = rowSummations[i];
            } else if (i === rows.length && j < maxCols) {
                // Last row
                value = colSummations[j];
            } else {
                // Last row and last columns
                value = 'LAST';
            }

            inferDataType(value);
            data[i].push(value);
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
