import React, { Component } from 'react';
import './App.css';
import { splitToRows, splitToColumns } from './splitter';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowSummations: [],
            colSummations: [],
        };
    }

    onChange(e) {
        const text = e.target.value;
        const rows = splitToRows(text).map(splitToColumns);
        const cols = [];
        const maxCols = rows.reduce((prev, row) => Math.max(row.length, prev), 0);
        console.log('Data matrix', rows);
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                if (typeof cols[j] === 'undefined') {
                    cols[j] = [];
                }

                cols[j].push(rows[i][j]);
            }
        }


        // Reduce 'em
        const rowSummations = rows.filter(row => row.length).map(arr => {
            return arr.map(n => parseFloat(n)).reduce((prev, curr) => prev + curr)
        });

        const colSummations = cols.filter(col => col.length).map(arr => {
            return arr.map(n => parseFloat(n)).reduce((prev, curr) => prev + curr)
        });

        this.setState({
            rowSummations,
            colSummations,
        });
    }

    render() {
        const rowSums = this.state.rowSummations.map((rowSum, i) => {
            return <span className="row summation" key={i}>{rowSum}</span>
        });
        const colSums = this.state.colSummations.map((colSum, i) => {
            return <span className="col summation" key={i}>{colSum}</span>
        });

        return (
            <div>
                <div className="horizontal">
                    <textarea id="input" onBlur={this.onChange.bind(this)} />
                    <div>{rowSums}</div>
                </div>
                <div>{colSums}</div>
        </div>);
    }
}

export default App;
