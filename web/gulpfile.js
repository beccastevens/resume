const gulp = require( 'gulp' ); // Gulp of-course.

const gutil = require('gulp-util'),
   	 	concat = require('gulp-concat'),
   	 	sass = require('gulp-sass'),
   	 	uglify = require('gulp-uglify'),
  		minify = require('gulp-clean-css'),
  		sourcemaps = require('gulp-sourcemaps');

const sassSources = ['sass/*.scss'];

gulp.task( 'styles', () => {
  return gulp
    .src( sassSources, { allowEmpty: true })
    .pipe ( sourcemaps.init() )
    .pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'compact',
				precision: 10
			})
		)
		.on( 'error', sass.logError )
    .pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe( sourcemaps.write( './' ) )
    .pipe( gulp.dest('./') );
})

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task(
	'default',
	gulp.parallel( 'styles', () => {
		gulp.watch( sassSources, gulp.parallel( 'styles' ) ); // Reload on SCSS file changes.
	})
);
