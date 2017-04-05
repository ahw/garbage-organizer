const LETTERS = 'LETTERS';
const DIGITS = 'DIGITS';
const CURRENCY = 'CURRENCY';
const COMMA = 'COMMA';
const PERIOD = 'PERIOD';
const WHITESPACE = 'WHITESPACE'; 
const UNKNOWN = 'UNKNOWN';
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

const transitions = {
    // Start
    [START]: [{
        test: isDigit,
        nextState: DIGITS,
        acc: (chunks, ch) => [ch],
    }, {
        test: isLetter,
        nextState: LETTERS,
        acc: (chunks, ch) => [ch],
    }],

    // Letters
    [LETTERS]: [{
        test: isDigit,
        nextState: DIGITS,
        acc: (chunks, ch) => [...chunks, ch],
    }, {
        test: isLetter,
        nextState: LETTERS,
        acc: (chunks, ch) => [...chunks.slice(0, -1), chunks.slice(-1) + ch],
    }],

    // DIGITS
    [DIGITS]: [{
        test: isDigit,
        nextState: DIGITS,
        acc: (chunks, ch) => [...chunks.slice(0, -1), chunks.slice(-1) + ch],
    }, {
        test: isLetter,
        nextState: LETTERS,
        acc: (chunks, ch) => [...chunks, ch],
    }],

    [CURRENCY]: [{
        test: isCurrencySymbol,
        nextState: CURRENCY,
        acc: (chunks, ch) => [...chunks, ch],
    }],

    [COMMA]: [{
        test: (ch) => /,/.test(ch),
        nextState: COMMA,
        acc: (chunks, ch) => [...chunks, ch],
    }]
}


export default function tokenize(str) {
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

        console.log(`Finished line. Line chunks:`, chunks);
        console.log();
        return chunks;
    });

    console.log(chunksByLine);
}
