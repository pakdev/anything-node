'use strict';

const React = require('react');
const remote = require('electron').remote;
const Everything = remote.require('./src/everything');

module.exports = React.createClass({
    query(searchTerm) {
        // first search for applications
        var i = 0;
        var results = [];

        searchTerm = searchTerm.trim();
        if (searchTerm) {
            for (let filename in this.applications) {
                if (filename.match(new RegExp(`^${searchTerm}$`, 'i'))) {
                    results.push({ rating: 5, path: this.applications[filename], name: filename, key: i++ });
                }
                else if (filename.match(new RegExp(`^${searchTerm}`, 'i'))) {
                    results.push({ rating: 4, path: this.applications[filename], name: filename, key: i++ });
                }
                else if (filename.match(new RegExp(`\\b${searchTerm}`, 'i'))) {
                    results.push({ rating: 3, path: this.applications[filename], name: filename, key: i++ });
                }
                else if (filename.match(new RegExp(searchTerm, 'i'))) {
                    results.push({ rating: 2, path: this.applications[filename], name: filename, key: i++ });
                }
                else {
                    // split into words
                    // query
                    // split into characters
                }
            }
        }

        this.props.onResults(results);
    },
    componentDidMount() {
        this.timeout = null;
        this.everything = new Everything();
        this.applications = this.everything.getApplications();
    },
    onSearchChange(e) { 
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            console.log(e.target.value);
            this.query(e.target.value);
        }, 250);
    },
    render() {
        var topsAligned = {top: 0};
        return (
            <div className="input-group input-group-lg">
                <span style={topsAligned} className="input-group-addon glyphicon glyphicon-search"></span>
                <input id="search" 
                       type="search" 
                       className="form-control" 
                       placeholder="Search"
                       autoFocus
                       onChange={this.onSearchChange}
                       />
            </div>
        );
    }
});