import {
    SET_HAS_HEADER,
    CHANGE_MODE,
    UPDATE_RAW_INPUT,
} from './actionTypes';

export function setHasHeader(hasHeader) {
    return {
        type: SET_HAS_HEADER,
        payload: {
            hasHeader,
        },
    };
}

export function changeMode(mode) {
    return {
        type: CHANGE_MODE,
        payload: {
            mode,
        },
    };
}

export function updateRawInput(rawInput) {
    return {
        type: UPDATE_RAW_INPUT,
        payload: {
            rawInput,
        },
    };
}
