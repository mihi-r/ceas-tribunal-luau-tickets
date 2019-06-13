const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

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
    .pipe(rollup({
      input: './scripts/main.js',
      format: 'cjs',
    }))
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'entry',
          corejs: 3,
        }],
      ],
    }))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./build'));
}

function templates() {
  return gulp
    .src('index.html')
    .pipe(replace(
      '<script src="scripts/main.js" type=module></script>',
      '<script src="build/main.min.js"></script>',
    ))
    .pipe(gulp.dest('.'));
}

function devTemplates() {
  return gulp
    .src('index.html')
    .pipe(replace(
      '<script src="build/main.min.js"></script>',
      '<script src="scripts/main.js" type=module></script>',
    ))
    .pipe(gulp.dest('.'));
}

function watchFiles() {
  gulp.watch('./scripts/*.js', gulp.series(scripts));
  gulp.watch('./styles/*.css', gulp.series(styles));
}

function watchFilesDev() {
  gulp.watch('./styles/*.css', gulp.series(devStyles));
}

const watch = gulp.parallel(scripts, styles, templates, watchFiles);
const dev = gulp.parallel(devStyles, devTemplates, watchFilesDev);

exports.watch = watch;
exports.dev = dev;
