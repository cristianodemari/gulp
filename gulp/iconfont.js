const { src, dest } = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const FONT_NAME = 'Icons';

// compile fonts svg to font face
module.exports = (from, to, template, pathScss, fontPath) => {
  return (done) => {
    src(from)
      .pipe(iconfontCss({
        cssClass: 'f-icon',
        fontName: FONT_NAME,
        // template to gerenate scss
        path: template,
        // folder do save scss compiled from template
        targetPath: pathScss,
        // prefix path to src font files woff, ttf, eot, woff2, svg
        fontPath: fontPath,
        centerHorizontally: true
      }))
      .pipe(iconfont({
        fontName: FONT_NAME,
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
        // (>= 1000)
        fontHeight: 1001,
        normalize: true
      }))
      .pipe(dest(to));

    done();
  }
};
