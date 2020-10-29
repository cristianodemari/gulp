const { watch, series, parallel } = require('gulp');
const path = require('path');
const js = require('./gulp/js');
const scss = require('./gulp/scss');
const scssbuild = require('./gulp/scssbuild');
const sprite = require('./gulp/sprite');
const eslint = require('./gulp/eslint');
const imagemin = require('./gulp/imagemin');
const iconfont = require('./gulp/iconfont');
const template = require('./gulp/template');
const jsbuild = require('./gulp/jsbuild');
const scsslint = require('./gulp/scsslint');
const iconfontcss = require('./gulp/iconfontcss');

const _d = (...args) => path.join(__dirname, ...args);

// tasks
exports.iconfont = iconfont(
  _d('src/icons/svg/*.svg'),
  _d('assets/fonts'),
  _d('src/templates/font-icon.template'),
  './../../src/scss/font-icon.scss', //relative from assets/fonts
  './../fonts/' //relative from the css file
);

exports.iconfontcss = iconfontcss(
  _d('src/scss/font-icon.scss'),
  _d('assets/css')
);

exports.js = js(
  _d('src/js/**/*'),
  _d('assets/js')
);

exports.scss = scss(
  _d('src/scss/style.scss'),
  _d('assets/css')
);

exports.scssbuild = scssbuild(
  _d('src/scss/style.scss'),
  _d('assets/css')
);

exports.imagemin = imagemin(
  _d('src/img/**/*'),
  _d('assets/img')
);

exports.jsbuild = jsbuild(
  _d('src/js/**/*'),
  _d('assets/js')
);

exports.template = template(
  _d('src/templates/preview-icon-fonts.html'),
  _d('assets')
);

exports.sprite = sprite(
  _d('src/sprite/*'),
  _d('src/scss'),
  _d('src/img')
);

// Linters
exports.eslint = eslint(
  _d('src/js/**/*')
);

exports.scsslint = scsslint(
  _d('src/scss/**/*.scss'),
  {
    options: {},
    configFile: config
  }
);

// watch files
exports.watch = () => {
  watch('src/js/**/*.js', exports.eslint);
  watch('src/scss/**/*.scss', exports.scsslint);
  watch('src/scss/**/*.scss', parallel(exports.scss, exports.scssbuild));
  watch('src/img/**/*', exports.imagemin);

  watch('src/js/**/*.js', parallel(
    exports.js,
    exports.jsbuild)
  );

  watch('src/icons/svg/**/*.svg', series(
    exports.template,
    exports.iconfont,
    exports.iconfontcss,
    exports.scss)
  );

}

// Default task
exports.default = parallel(
  series(
    series(
      exports.iconfont,
      exports.iconfontcss,
      exports.sprite,
      exports.imagemin
    ),
    parallel(
      exports.scss,
      exports.scssbuild
    )
  ),
  exports.template,
  parallel(
    exports.js,
    exports.jsbuild
  )
);
