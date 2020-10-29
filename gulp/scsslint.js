const { src } = require('gulp');
const sassLint = require('gulp-sass-lint');

module.exports = (from, config) => {
  return (done) => {
    src(from)
      .pipe(sassLint(config))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())

    done();
  }
}
