const LETTERS = 'LETTERS';
const DIGITS = 'DIGITS';
const DATE = 'DATE';
const CURRENCY = 'CURRENCY';
const WHITESPACE = 'WHITESPACE'; 
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

const xtransitions = [{
    fromState: LETTERS,
    test: isDigit,
    toState: DIGITS,
    acc: (chunks, ch) => [...chunks, ch],
}, {
    fromState: LETTERS,
    test: isLetter,
    toState: LETTERS,
    acc: (chunks, ch) => [...chunks.slice(0, -1), chunks.slice(-1) + ch],
}, {
}];

const transitions = {
    // Start
    [START]: [{
        test: isDigit,
        toState: DIGITS,
        acc: (chunks, ch) => [ch],
    }, {
        test: isLetter,
        toState: LETTERS,
        acc: (chunks, ch) => [ch],
    }],

    // Letters
    [LETTERS]: [{
        test: isDigit,
        toState: DIGITS,
        acc: (chunks, ch) => [...chunks, ch],
    }, {
        test: isLetter,
        toState: LETTERS,
        acc: (chunks, ch) => [...chunks.slice(0, -1), chunks.slice(-1) + ch],
    }],

    // DIGITS
    [DIGITS]: [{
        test: isDigit,
        toState: DIGITS,
        acc: (chunks, ch) => [...chunks.slice(0, -1), chunks.slice(-1) + ch],
    }, {
        test: isLetter,
        toState: LETTERS,
        acc: (chunks, ch) => [...chunks, ch],
    }]
}


export default function tokenize(str) {
    let currentState = START;
    const chunksByLine = str.split('\n').map(line => {
        let chunks = [];
        line.split('').forEach(ch => {
            const transitionsForState = transitions[currentState];
            for (let i = 0; i < transitionsForState.length; i++) {
                const transition = transitionsForState[i];
                if (transition.test(ch)) {
                    // console.log(`Got char ${ch}. Transitioning from ${currentState} to ${transition.toState}`);
                    currentState = transition.toState;
                    chunks = transition.acc(chunks, ch);
                    break;
                }
            }
        });

        console.log(`Finished line. Line chunks:`, chunks);
        console.log();
        return chunks;
    });

    console.log(chunksByLine);
}
