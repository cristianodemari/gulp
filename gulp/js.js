const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

module.exports = (from, to) => {
  return (done) => {
    src(from)
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(sourcemaps.init())
      .pipe(uglify({
        output: {
          beautify: false
        },
        compress: false,
        sourceMap: true
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(to));

    done();
  }
}
