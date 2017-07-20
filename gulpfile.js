var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create();



gulp.task('lint', () => {
  return gulp.src(['js/*.js','!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
  });

gulp.task('scripts', ['lint'], function(){
  gulp.src('js/**/*.js')
  .pipe(uglify())   //call the uglify
  .pipe(rename({ extname: '.min.js'}))   //rename the new file
  .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', function() {
   gulp.watch('js/*.js', ['scripts']);    // add if you want to run more "scripts"
});

gulp.watch('build/js/*.js').on('change', browserSync.reload);


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('default', ['watch', 'browser-sync']);