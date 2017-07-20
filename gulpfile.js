var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyError = require('gulp-prettyerror');



gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(prettyError()) // ADD THIS LINE
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});




//                          CSS/SASS functions




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



//                          JS functions




gulp.task('watch', function() {
   gulp.watch('js/*.js', ['scripts']);    // add if you want to run more "scripts"
   gulp.watch('sass/*.scss', ['sass']);
});




gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['build/js/*.js', 'build/css/*.css']).on('change', browserSync.reload);
});


gulp.task('default', ['watch', 'browser-sync']);