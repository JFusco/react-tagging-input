'use strict';

import webpack from 'webpack';
import path from 'path';
import config from './config.json';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const { library, entry, fileName } = config.scripts;

module.exports =  {
	entry: {
		//[fileName]: `./src/component/js/${entry}.js`,
		//[`${fileName}.min`]: `./src/component/js/${entry}.js`
		app: './src/component/app.js'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist'),
		publicPath: '/',
		libraryTarget: 'umd',
		library
	},
	module: {
		loaders: [
			{
				loader: 'babel',
				exclude: '/node_modules/',
				test: /\.js?$/
			},
			{
				//loader: ExtractTextPlugin.extract(
				//	'style',
				//	'css?sourceMap!sass?sourceMap'
				//),
				loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
				test: /\.scss$/
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		//new ExtractTextPlugin('tags.css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			comments: false,
			beautify: false,
			mangle: {
				screw_ie8 : true
			},
			compress: {
				warnings: false,
				drop_console: true
			},
			output: {
				comments: false
			}
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'src/component'),
		port: 8080
	},
	resolve: {
		extensions: ['', '.js', '.scss']
	}
};
