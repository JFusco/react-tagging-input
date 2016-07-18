'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins({pattern: ['gulp-*', 'run-sequence', 'minimist'], scope: ['devDependencies']});
const argv = $.minimist(process.argv.slice(2));

require('./gulp/bridge.js')(gulp, [
	'eslint',
	'webpack',
	'babel',
	'scss-lint',
	'sass',
	'clean-css',
	'test',
	'watch'
], $);

gulp.task('default', cb => {
	$.runSequence('sass', 'cleanCSS', 'eslint', 'test', 'webpack', 'babel', () => {
		$.util.log($.util.colors.green.bold('FINISHED BUILD'));

		if(argv.w){
			$.runSequence('watch');
		}

		cb();
	});
});
