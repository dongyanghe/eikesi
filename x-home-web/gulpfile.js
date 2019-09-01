// 加载相关插件
var gulp = require('gulp');

/** 
 * 为css添加兼容写法
 */
gulp.task('css', () => {
    const postcss    = require('gulp-postcss')
    const sourcemaps = require('gulp-sourcemaps')
    return gulp.src('css/**/*.css')
      .pipe( sourcemaps.init() )
      .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('dist/') )
  })