'use strict';

import webpack from 'webpack';
import path from 'path';
import config from './config.json';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const { library } = config.scripts;

module.exports =  {
	devtool: '#eval-source-map',
	entry: './src/example/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/docs'),
		publicPath: '/',
		libraryTarget: 'umd',
		library
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
				})
			},
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('styles.css'),
		new CopyWebpackPlugin([
			{ from: './src/example/index.html', to: './' },
			{ from: './src/example/index.css', to: './' },
			{ from: './coverage', to: './coverage' }
		]),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
			}
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'src/example'),
		port: 8080
	},
	resolve: {
		extensions: ['.js', '.scss']
	}
};
