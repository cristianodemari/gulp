const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

module.exports = (from, to) => {
  return (done) => {
    src(from)
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(concat('main.min.js'))
      .pipe(uglify({
        output: {
          beautify: true
        },
        compress: true,
        sourceMap: false
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(to));

    done();
  }
}
