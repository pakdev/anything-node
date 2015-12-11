'use strict';

const React = require('react');
const remote = require('electron').remote;
const Everything = remote.require('./src/everything');

module.exports = React.createClass({
    getDefaultProps() {
        return { items: [] };
    },
    launch(path) {
        this.everything.launch(path);
        // process.exec(path);
    },
    componentDidMount() {
        this.everything = new Everything();
    },
    render() {
        var results = [];
        this.props.items.sort((a, b) => {
            return b.rating - a.rating;
        });
        this.props.items.forEach((result) => {
            results.push((
                <tr key={result.key} onClick={this.launch.bind(this, result.path)}>
                    <td>
                        {result.rating}
                    </td>
                    <td>
                        {result.name}
                    </td>
                </tr>));
        });

        var header = null;
        if (results.length > 0) {
            header = (
                <thead>
                    <tr>
                        <td>Rating</td>
                        <td>File</td>
                    </tr>
                </thead>
            );
        }

        const smallCol = { width: 100 };

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-hover table-bordered table-condensed">
                        <colgroup>
                            <col style={smallCol} />
                            <col />
                        </colgroup>
                        {header}
                        <tbody>
                            {results}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});