const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const bulkSass = require('gulp-sass-bulk-import');
const rename = require("gulp-rename");

module.exports = (from, to) => {
  return (done) => {
    src(from)
      .pipe(bulkSass())
      .pipe(sass({
        outputStyle: 'compressed',
      })
      )
      .pipe(sourcemaps.write())
      .pipe(rename('main.min.css'))
      .pipe(dest(to));

    done();
  }
};
