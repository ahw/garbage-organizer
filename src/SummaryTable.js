import React from 'react';

export default function SummaryTable(props) {
    const trs = props.data.map((row, rowIndex) => {
        const tds = row.map((cellContent, colIndex) => {
            const isUndefined = cellContent === 'N/A';
            const isBottomCorner = (rowIndex === props.data.length - 1)
                && (colIndex === row.length - 1);
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
            className="summaryTable"
            onDoubleClick={props.enterEditMode}
        >
            {body}
        </table>
    );
}
