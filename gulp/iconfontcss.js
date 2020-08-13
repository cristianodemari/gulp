const { src, dest } = require('gulp');
const sass = require('gulp-sass');

module.exports = (from, to) => {
  return (done) => {
    src(from)
      .pipe(sass())
      .pipe(dest(to));

    done();
  }
};
