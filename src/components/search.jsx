'use strict';

const React = require('react');
const remote = require('electron').remote;
const ffi = remote.require('ffi');

module.exports = React.createClass({
    getDefaultProps() {
        const everything = ffi.Library('./../../lib/Everything64.dll', {
            'Everything_SetSearchA': ['void', ['string']],
            'Everything_SetMax': ['void', ['ulong']],
            'Everything_QueryA': ['bool', ['bool']],
            'Everything_GetNumResults': ['ulong', []]
        });

        return { lib: everything };
    },
    componentWillMount() {
        this.props.lib.Everything_SetMax(10);
    },
    onSearchChange(e) { 
        this.props.lib.Everything_SetSearchA(e.target.value);
        this.props.lib.Everything_QueryA(false);
        // console.log(this.props.lib.Everything_GetNumResults());
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