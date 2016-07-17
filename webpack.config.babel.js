'use strict';

import webpack from 'webpack';
import path from 'path';

const paths = {
	output: path.join(__dirname, '/dist'),
	src: './src/js'
};

export default {
	entry: `${paths.src}/Tags.js`,
	output: {
		path: paths.output,
		filename: 'react-tags.min.js',
		libraryTarget: 'umd',
		library: 'Tags'
	},
	module: {
		loaders: [
			{
				loader: 'babel',
				exclude: '/node_modules/',
				test: /\.js?$/
			}
		]
	},
	externals: {
		'react': 'React',
		'react-addons-update': 'update'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin()
	],
	resolve: {
		extensions: ['', '.js']
	}
};
