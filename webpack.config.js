'use strict'

const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

let config = {
    entry: ['./src/main.jsx'],
    output: {
        path: __dirname + "/build",
        publicPath: 'build/',
        filename: 'main.js'
    },
    devtool: 'source-map',
    stats: {
        colors: true,
        modules: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
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
        new webpack.NoErrorsPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9999,
            open: false,
            files: ['index.html', 'build/main.js'],
            server: {
                baseDir: ['.']
            }
        }),
        new webpack.DefinePlugin({
            'process.env': { 
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') 
            }
        })
    ]
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
