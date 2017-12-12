const DONE = 'DONE';
const LETTER = 'LETTER';
const INTEGER = 'INTEGER';
const FLOAT = 'FLOAT';
const CURRENCY = 'CURRENCY';
const COMMA = 'COMMA';
const PERIOD = 'PERIOD';
const WHITESPACE = 'WHITESPACE'; 
const UNKNOWN = 'UNKNOWN';
const NEWLINE = 'NEWLINE';
const START = 'START';

function isLetter(ch) {
    return /[a-zA-Z]/.test(ch);
}

function isDigit(ch) {
    return /[0-9]/.test(ch);
}

function isCurrencySymbol(ch) {
    return /\$/.test(ch);
}

function isNewline(ch) {
    return /\n/.test(ch);
}

function isPeriod(ch) {
    return /\./.test(ch);
}

const isComma = (ch) => /,/.test(ch);

export function tokenize(textBlob) {
    const tokens = [];
    let state = START;
    let currentToken = null;

    for (let i = 0; i < textBlob.length; i++) {
        const ch = textBlob[i];
        const letter = isLetter(ch);
        const digit = isDigit(ch);
        const currency = isCurrencySymbol(ch);
        const comma = isComma(ch);
        const period = isPeriod(ch);

        console.log(`[${state}] next char --> ${ch} currentToken [${currentToken}]`);
        if (state === START) {
            if (letter) {
                currentToken = ch;
                state = LETTER;
            } else if (digit) {
                currentToken = ch;
                state = INTEGER;
            } else if (comma) {
                currentToken = ch;
                state = COMMA;
            }
        } else if (state === LETTER) {
        } else if (state === INTEGER) {
            if (letter) {
                tokens.push(parseInt(currentToken, 10));
                currentToken = ch;
                state = LETTER;
            } else if (digit) {
                currentToken += ch;
                state = INTEGER;
            } else if (period) {
                currentToken += ch;
                state = FLOAT;
            }
        } else if (state === FLOAT) {
            if (letter) {
                tokens.push(parseInt(currentToken, 10));
                currentToken = ch;
                state = LETTER;
            } else if (digit) {
                currentToken += ch;
                state = FLOAT;
            } else if (period) {
                tokens.push(parseFloat(currentToken));
                currentToken = ch;
                state = PERIOD;
            } else if (comma) {
                tokens.push(parseFloat(currentToken));
                currentToken = ch;
                state = COMMA;
            }
        } else if (state === CURRENCY) {
        } else if (state === COMMA) {
        } else if (state === PERIOD) {
        } else if (state === WHITESPACE) {
        } else if (state === NEWLINE) {
        } else if (state === UNKNOWN) {
        } else {
        }
    }

    // All done. Make sure to parse the last token
    console.log(`Final state [${state}] currentToken [${currentToken}]`);
    if (state === INTEGER) {
        tokens.push(parseInt(currentToken));
    } else if (state === FLOAT) {
        tokens.push(parseFloat(currentToken));
    }

    return tokens;
}


export default function oldTokenize(str) {
    let currentState = START;
    const chunksByLine = str.split('\n').map(line => {
        const chunks = line.split('').reduce((prev, ch) => {
            const transitionsForState = transitions[prev.state];
            let transition = null;
            for (let i = 0; i < transitionsForState.length; i++) {
                transition = transitionsForState[i];
                if (transition.test(ch)) {
                    break;
                }
            }

            console.groupCollapsed(`Character ${ch}`);
            console.log(`OLD state ${prev.state}`);
            console.log(`NEW state ${transition.nextState}`);
            console.log(`Accumulator`, '', transition.acc(prev.acc, ch));
            console.groupEnd();

            return {
                state: transition.nextState,
                acc: transition.acc(prev.acc, ch),
            };
        }, { state: START, acc: null });

        console.log();
        return chunks;
    });

    console.log(chunksByLine);
}
