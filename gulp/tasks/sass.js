'use strict';

import configuration from '../../config.json';

module.exports = (gulp, $) => {
	gulp.task('sass', ['scss-lint'], () => {
		return gulp.src('./src/scss/**/*.scss')
			.pipe($.sass().on('error', $.sass.logError))
			.pipe($.rename(`${configuration.css.fileName}.css`))
			.pipe(gulp.dest('./dist'))
			.pipe($.filelog('SASS'));
	});
};
