import React, { Component } from 'react';
import './App.css';
import { splitToRows, splitToColumns } from './splitter';

class App extends Component {
    onChange(e) {
        const text = e.target.value;
        const rows = splitToRows(text).map(splitToColumns);
        const cols = [];
        const maxCols = rows.reduce((prev, row) => Math.max(row.length, prev), 0);
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                if (typeof cols[j] === 'undefined') {
                    cols[j] = [];
                }

                // console.log(`Pushing item at row ${i} col ${j} to col ${j}`);
                cols[j].push(rows[i][j]);
            }
        }


        // Reduce 'em
        const rowSum = rows.filter(row => row.length).map(arr => {
            return arr.map(n => parseFloat(n)).reduce((prev, curr) => prev + curr)
        });

        const colSum = cols.filter(col => col.length).map(arr => {
            return arr.map(n => parseFloat(n)).reduce((prev, curr) => prev + curr)
        });

        console.log('row summations', rowSum);
        console.log('col summations', colSum);
    }

    render() {
        return (<div>
            <textarea id="input" onBlur={this.onChange} />
        </div>);
    }
}

export default App;
