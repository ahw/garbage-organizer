import { combineReducers } from "redux";
import {
    SET_HAS_HEADER,
    CHANGE_MODE,
    UPDATE_RAW_INPUT,
    UPDATE_SUMMARY_TABLE_WIDTH,
} from '../actionTypes';
import { parse } from '../../logic/parse';

const initialState = {
    mode: 'edit',
    hasHeader: false,
    rawInput: "",
    summaryTableWidth: null,
    derivedData: {
        rowSummations: [],
        colSummations: [],
    }
};

function hasHeader(state = initialState.hasHeader, action) {
    switch (action.type) {
        case SET_HAS_HEADER:
            return action.payload.hasHeader;
        default:
            return state;
    }
}

function mode(state = initialState.mode, action) {
    switch (action.type) {
        case CHANGE_MODE:
            return action.payload.mode;
        default:
            return state;
    }
}

function rawInput(state = initialState.rawInput, action) {
    if (action.type === UPDATE_RAW_INPUT) {
        return action.payload.rawInput;
    }

    return state;
}

function derivedData(state = initialState.derivedData, action) {
    if (action.type !== UPDATE_RAW_INPUT) {
        return state;
    }

    // logic...
    const { data, rowSummations, colSummations } = parse(action.payload.rawInput);
    
    return {
        data,
        rowSummations,
        colSummations,
    }
}

function summaryTableWidth(state = initialState.summaryTableWidth, action) {
    if (action.type !== UPDATE_SUMMARY_TABLE_WIDTH) {
        return state;
    }

    const width = parseInt(action.payload.summaryTableWidth, 10);
    return isNaN(width) ? 'auto' : width;
}


export default combineReducers({
    hasHeader,
    mode,
    rawInput,
    derivedData,
    summaryTableWidth,
});

