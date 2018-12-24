import React, { Component } from 'react';

export default class SummaryTable extends Component {
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
            console.log(`width is ${width} pixels`);
        }, 100);
    }

    render() {
        const trs = this.props.data.map((row, rowIndex) => {
            const tds = row.map((cellContent, colIndex) => {
                const isUndefined = cellContent === 'N/A';
                const isBottomCorner = (rowIndex === this.props.data.length - 1) && (colIndex === row.length - 1);

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
                onDoubleClick={this.props.enterEditMode}
            >
                {body}
            </table>
        );
    }
}
