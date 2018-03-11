import React, { Component } from 'react';
import currency from 'currency.js';
import './App.css';
import { splitToRows, splitToColumns } from './splitter';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowSummations: [],
            colSummations: [],
            editing: false,
        };
    }

    onChange(e) {
        const text = e.target.value;
        const rows = splitToRows(text).map(splitToColumns);
        const cols = [];
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
            return arr.reduce((acc, curr) => currency(acc).add(curr), 0).value;
        });

        const colSummations = cols.filter(col => col.length).map(arr => {
            return arr.reduce((acc, curr) => currency(acc).add(curr), 0).value;
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
                    <textarea id="input" onChange={this.onChange.bind(this)} />
                    <div className="summationContainer">{rowSums}</div>
                </div>
                <div>{colSums}</div>
        </div>);
    }
}

export default App;
