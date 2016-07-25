'use strict';

module.exports = (gulp, $) => {
	gulp.task('test', () => {
		return gulp.src('./src/js/Tags.js', {read: false})
			.pipe($.shell('npm test'));
	});
};
