'use strict';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const rules = [
	{
		test: /\.js?$/,
		loader: 'babel-loader',
		exclude: '/node_modules/'
	},
	{
		test: /\.scss$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
		})
	}
];

export default rules;
