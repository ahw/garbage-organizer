import React from 'react';
import { connect } from 'react-redux';
import {
    updateRawInput,
    changeMode,
} from '../redux/actions';

function mapStateToProps(state, ownProps) {
    return {
        rawInput: state.rawInput,
        derivedData: state.derivedData,
        summaryTableWidth: state.summaryTableWidth,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange: (e) => dispatch(updateRawInput(e.target.value)),
        changeMode: (mode) => dispatch(changeMode(mode)),
    };
}


function EditTable(props) {
    const rowSums = props.derivedData.rowSummations.map((rowSum, i) => {
        return <span className="row summation" key={i}>{rowSum}</span>
    });
    const colSums = props.derivedData.colSummations.map((colSum, i) => {
        return <span className="col summation" key={i}>{colSum}</span>
    });

    return (
        <div style={{width: props.summaryTableWidth || 'auto'}}>
            <div className="horizontal">
                <textarea
                    id="input"
                    autoFocus
                    onChange={props.onChange}
                    value={props.rawInput}
                    onDoubleClick={() => props.changeMode('view')}
                />
                <div className="summationContainer">{rowSums}</div>
            </div>
            <div>{colSums}</div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTable);
