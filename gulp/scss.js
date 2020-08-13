const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const bulkSass = require('gulp-sass-bulk-import');

module.exports = (from, to) => {
  return (done) => {

    src(from)
      .pipe(sourcemaps.init())
      .pipe(bulkSass())
      .pipe(sass({
        outputStyle: false
      })
      )
      .pipe(sourcemaps.write())
      .pipe(dest(to));

    done();
  }
};
