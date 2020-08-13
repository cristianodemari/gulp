const { src, dest } = require('gulp');
const template = require('gulp-template');
const fs = require('fs');
const path = require('path');

module.exports = (from, to) => {
  return (done) => {
    src(from)
      .pipe(template({
        'icons': fs.readdirSync(
          path.join(__dirname, '..', 'src', 'icons', 'svg')
        )
          .map(function (name) {
            return name.replace(/\.[^/.]+$/, '');
          })
      }))
      .pipe(dest(to));

    done();
  }
};
