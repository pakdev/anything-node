'use strict';

require('bootstrap-sass!./../bootstrap-sass.config.js');
require('./styles/index.scss');

const React = require('react');
const ReactDOM = require('react-dom');
const Anything = require('./components/anything.jsx');

ReactDOM.render(<Anything />, document.getElementById('content'));