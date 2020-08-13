const { src } = require('gulp');
const sassLint = require('gulp-sass-lint');

module.exports = (from) => {
  return (done) => {
    src(from)
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())

    done();
  }
}
