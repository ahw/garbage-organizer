import React, { Component } from 'react';
import './App.css';
import tokenize from './tokenizer';

class App extends Component {
    onChange(e) {
        tokenize(e.target.value);
    }

    render() {
        return (<div>
            <textarea id="input" onChange={this.onChange} />
        </div>);
    }
}

export default App;
