const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function styles() {
  return gulp
    .src('./styles/*.css')
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulp.dest('./build/'));
}

function devStyles() {
  return gulp
    .src('./styles/*.css')
    .pipe(gulp.dest('./build/'));
}

function scripts() {
  return gulp
    .src('./scripts/*.js')
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'entry',
          corejs: 3,
        }],
      ],
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
}

function devScripts() {
  return gulp
    .src('./scripts/*.js')
    .pipe(gulp.dest('./build/'));
}

function watchFiles() {
  gulp.watch('./scripts/*.js', gulp.series(scripts));
  gulp.watch('./styles/*.css', gulp.series(styles));
}

function watchFilesDev() {
  gulp.watch('./scripts/*.js', gulp.series(devScripts));
  gulp.watch('./styles/*.css', gulp.series(devStyles));
}

const watch = gulp.parallel(scripts, styles, watchFiles);
const dev = gulp.parallel(devScripts, devStyles, watchFilesDev);

exports.watch = watch;
exports.dev = dev;
