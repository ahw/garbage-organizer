import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeMode,
    updateSummaryTableWidth,
} from '../redux/actions';

function mapStateToProps(state, ownProps) {
    return {
        derivedData: state.derivedData,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeMode: mode => dispatch(changeMode(mode)),
        updateSummaryTableWidth: width => dispatch(updateSummaryTableWidth(width)),
    };
}

class SummaryTable extends Component {
    constructor(props) {
        super(props);
        // this.id = Math.random().toString(31).substr(2, 16);
        this.tableRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            const table = this.tableRef.current;
            const style = window.getComputedStyle(table);
            const width = style.width.match(/(\d+\.?\d*)px/)[1];
            this.props.updateSummaryTableWidth(width);
        }, 100);
    }

    render() {
        const trs = this.props.derivedData.data.map((row, rowIndex) => {
            const tds = row.map((cellContent, colIndex) => {
                const isUndefined = cellContent === 'N/A';
                const isBottomCorner = (rowIndex === this.props.derivedData.data.length - 1) && (colIndex === row.length - 1);

                if (isUndefined) {
                    cellContent = 'undefined';
                } else if (isBottomCorner) {
                    cellContent = '';
                }
                return (
                    <td
                        data-is-undefined={isUndefined}
                        key={colIndex}
                    >
                        {cellContent}
                    </td>
                );
            });
            return <tr key={rowIndex}>{tds}</tr>
        });

        const body = <tbody>{trs}</tbody>

        return (
            <table
                ref={this.tableRef}
                className="summaryTable"
                onDoubleClick={() => this.props.changeMode('edit')}
            >
                {body}
            </table>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryTable);
