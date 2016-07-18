'use strict';

module.exports = (gulp, $) => {
	gulp.task('watch', () => {
		gulp.watch(['./src/js/**/*.js'], ['eslint', 'test-dev']);
		gulp.watch(['./src/scss/**/*.scss'], ['scss-lint']);
	});
};
