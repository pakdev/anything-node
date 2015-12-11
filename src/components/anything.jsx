'use strict';

const React = require('react');
const Search = require('./search.jsx');
const Results = require('./results.jsx');

module.exports = React.createClass({
    updateResults(results) {
        this.setState({ results: results });
    },
    getInitialState() {
        return { results: [] };
    },
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Search onResults={this.updateResults} />
                    </div>
                </div>
                <Results items={this.state.results} />
            </div>
        );
    }
});
            