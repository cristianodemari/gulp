const { src, dest } = require('gulp');
const spritesmith = require('gulp.spritesmith');
const path = require('path');

module.exports = (from, to, toImg) => {
  return (done) => {
    const spriteData =
      src(from)
        .pipe(spritesmith({
          imgName: '../img/sprite.png',
          retinaImgName: '../img/sprite@2x.png',
          retinaSrcFilter: [path.join(__dirname, '..', 'src/sprite/*@2x*.png')],
          cssName: 'sprite.scss',
          cssFormat: 'scss',
          padding: 10,
          algorithm: 'binary-tree',
          cssTemplate: path.join(
            __dirname, '..', 'src', 'templates', 'sprite.template'
          ),
          imgOpts: { qualiWty: 85 },
          cssVarMap: function (sprite) {
            if (sprite.name.indexOf('-hover') !== -1) {
              sprite.name = sprite.name.replace('-hover', '');
              sprite.pseudoClass = ':hover';
            } else {
              sprite.name = sprite.name;
              sprite.pseudoClass = '';
            }
            return sprite;
          }
        }));

    spriteData.css.pipe(dest(to));
    spriteData.pipe(dest(toImg))
    done();
  }
};
