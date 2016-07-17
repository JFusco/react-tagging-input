'use strict';

module.exports = (gulp, $) => {
	gulp.task('babel', () => {
		return gulp.src('./src/js/Tags.js', {read: false})
			.pipe($.shell('babel src/js --out-dir dist-components'));
	});
};
