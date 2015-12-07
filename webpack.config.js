var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: ['./src/main.js'],
	output: {
		path: __dirname + "/build",
		publicPath: 'build/',
		filename: 'main.js'
	},
	devtool: 'source-map',
	target: 'atom',
	stats: {
		colors: true,
		modules: true,
		reasons: true
	},
	resolve: {
		modulesDirectories: [
			'node_modules'
		],
	},
	module: {
		loaders: [
			{
				test: /bootstrap-sass\/assets\/javascripts\//, 
				loader: 'imports?jQuery=jquery'
			},
			{
				test: /\.js/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{ 
				test: /\.woff(2)?$/,
				loader: "url-loader?limit=10000&minetype=application/font-woff"
			},
      		{ 
      			test: /\.ttf$/,    
      			loader: "file-loader" 
      		},
      		{ 
      			test: /\.eot$/,    
      			loader: "file-loader" 
      		},
      		{ 
      			test: /\.svg$/,    
      			loader: "file-loader" 
      		}
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/vertx/),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 9999,
			open: false,
			files: ['index.html', 'build/main.js'],
			server: {
				baseDir: ['.']
			}
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	]
};
