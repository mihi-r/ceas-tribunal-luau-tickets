const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const purge = require('gulp-css-purge');

function styles() {
  return gulp
    .src('./styles/*.css')
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(purge({
      trim: true,
      shorten: true,
      verbose: true,
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/'));
}

function devStyles() {
  return gulp
    .src('./styles/*.css')
    .pipe(purge({
      trim: false,
      shorten: true,
    }))
    .pipe(gulp.dest('./styles/'));
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
    .pipe(replace(
      '<link rel="stylesheet" type="text/css" href="styles/style.css">',
      '<link rel="stylesheet" type="text/css" href="build/style.min.css">',
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
    .pipe(replace(
      '<link rel="stylesheet" type="text/css" href="build/style.min.css">',
      '<link rel="stylesheet" type="text/css" href="styles/style.css">',
    ))
    .pipe(gulp.dest('.'));
}

function watchFiles() {
  gulp.watch('./scripts/*.js', gulp.series(scripts));
  gulp.watch('./styles/*.css', gulp.series(styles));
}

const watch = gulp.parallel(scripts, styles, templates, watchFiles);
const dev = gulp.parallel(devTemplates, devStyles);

exports.watch = watch;
exports.dev = dev;
