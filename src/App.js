import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import SummaryTable from './SummaryTable';
import EditTable from './EditTable';

function mapStateToProps(state, ownProps) {
    return {
        mode: state.mode,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {};
}

class App extends Component {

    render() {
        console.log('app render', this.props);
        if (this.props.mode === 'edit') {
            return (
                <EditTable />
            );
        } else {
            return (
                <SummaryTable
                    data={[]}
                    enterEditMode={() => this.setState({ editMode: true })}
                />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
