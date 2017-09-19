import React, { Component } from 'react';
import './App.css';
import tokenizer from 'string-tokenizer';
tokenizer.token('digit', /\d+/);

class App extends Component {
    onChange(e) {
        tokenizer.input(e.target.value);
    }

    render() {
        return (<div>
            <textarea id="input" onBlur={this.onChange} />
        </div>);
    }
}

export default App;
