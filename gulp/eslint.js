const { src } = require('gulp');
const eslint = require('gulp-eslint');

module.exports = (from) => {
  return (done) => {
    src(from)
      .pipe(eslint({
        extends: ["eslint:recommended"],
        // https://eslint.org/demo
        configFile: '.eslintrc'
      }))
      .pipe(eslint.format())
      .pipe(eslint.result(result => {
        if (
          result.messages.length ||
          result.warningCount ||
          result.errorCount
        ) {
          console.log(`ESLint result: ${result.filePath}`);
          console.log(`# Messages: ${result.messages.length}`);
          console.log(`# Warnings: ${result.warningCount}`);
          console.log(`# Errors: ${result.errorCount}`);
        }
      }));

    done();
  }
}
