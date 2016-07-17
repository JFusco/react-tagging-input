'use strict';

module.exports = (gulp, $) => {
	gulp.task('webpack', () => {
		return gulp.src('./src/js/Tags.js', {read: false})
			.pipe($.shell('webpack --display-chunks --display-modules --progress --colors'));
	});
};
