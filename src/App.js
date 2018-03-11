import React, { Component } from 'react';
import './App.css';
import { parse } from './parse';
import SummaryTable from './SummaryTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowSummations: [],
            colSummations: [],
            editMode: true,
        };
    }

    onBlur(e) {
        this.setState({ editMode: false });
    }

    onChange(e) {
        const text = e.target.value;
        const { data, rowSummations, colSummations } = parse(text);

        this.setState({
            rowSummations,
            colSummations,
            data,
            text,
        });
    }

    render() {
        if (this.state.editMode) {
            const rowSums = this.state.rowSummations.map((rowSum, i) => {
                return <span className="row summation" key={i}>{rowSum}</span>
            });
            const colSums = this.state.colSummations.map((colSum, i) => {
                return <span className="col summation" key={i}>{colSum}</span>
            });

            return (
                <div>
                    <div className="horizontal">
                        <textarea
                            id="input"
                            autoFocus
                            onChange={this.onChange.bind(this)}
                            value={this.state.text}
                            onBlur={() => this.setState({ editMode: false })}
                        />
                        <div className="summationContainer">{rowSums}</div>
                    </div>
                    <div>{colSums}</div>
                </div>
            );
        } else {
            return (
                <SummaryTable
                    data={this.state.data}
                    enterEditMode={() => this.setState({ editMode: true })}
                />
            );
        }
    }
}

export default App;
