'use strict';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const { NODE_ENV } = process.env;

const rules = [
	{
		test: /\.js?$/,
		loader: 'babel-loader',
		exclude: '/node_modules/'
	}
];

if(NODE_ENV === 'production'){
	rules.push({
		test: /\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
		})
	});
}else{
	rules.push({
		test: /\.scss$/,
		use: [{
			loader: 'style-loader'
		}, {
			loader: 'css-loader?sourceMap'
		}, {
			loader: 'sass-loader?sourceMap'
		}]
	});
}

export default rules;
