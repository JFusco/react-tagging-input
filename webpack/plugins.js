'use strict';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config.json';

const { NODE_ENV } = process.env;

const plugins = [
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.DefinePlugin({
		'__DEV__': process.env.NODE_ENV === 'development',
		'process.env': {
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}
	})
];

if(NODE_ENV === 'production'){
	plugins.push(
		new ExtractTextPlugin('styles.css')
	);
}

export default plugins;
