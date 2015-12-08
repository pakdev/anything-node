'use strict';

const React = require('react');
// const remote = require('electron');

module.exports = React.createClass({
    onSearchChange(e) { 
        console.log(e.target.value);
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