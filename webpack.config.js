'use strict'

const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

let config = {
    entry: ['./src/main.jsx'],
    output: {
        path: __dirname + "/build",
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    stats: {
        colors: true,
        modules: true,
        reasons: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'jsx-loader?harmony&insertPragma=React.DOM'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            { 
                test: /\.woff(2)?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            { 
                test: /\.(ttf|eot|svg)$/,    
                loader: "file-loader" 
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { 
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') 
            }
        })
    ],
    externals: [
        'ffi', 'ref'
    ]
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
