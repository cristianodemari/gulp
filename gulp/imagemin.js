const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = (from, to) => {
  return (done) => {
    src(from)
      .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]))
      .pipe(dest(to));

    done();
  }
};
