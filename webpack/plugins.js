'use strict';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config.json';

const { fileName } = config.css;
const { NODE_ENV } = process.env;

const plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.DedupePlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
	})
];

if(NODE_ENV === 'prod'){
	plugins.push(
		new ExtractTextPlugin(`${fileName}.css`)
	);
}

export default plugins;
