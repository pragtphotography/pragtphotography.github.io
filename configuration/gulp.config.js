const gulp = require('gulp');
const connect = require('gulp-connect');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');

gulp.task('default', () => {
  console.log('building...');
});

// #region Building

gulp.task(
  'build',
  [
    'deploy-markup',
    'deploy-styles',
    'deploy-images'
  ]
);

// #region Markup

gulp.task(
  'deploy-markup',
  () => {
    return gulp
      .src('../source/html/index.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('../docs'))
      .pipe(connect.reload());
  }
);

// #endregion Markup

// #region Styles

gulp.task(
  'deploy-styles',
  () => {
    return gulp
      .src('../source/css/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('../docs/styles'))
      .pipe(connect.reload());
  }
)

// #endregion Styles

// #region Images

gulp.task(
  'deploy-images',
  () => {
    return gulp
      .src('../source/images/**/*.*')
      .pipe(gulp.dest('../docs/images'))
      .pipe(connect.reload());
  }
)

// #endregion Images

// #endregion Building

// #region Development

gulp.task(
  'develop',
  [
    'build', 
    'watch', 
    'serve'
  ]
);

// #region Watch For Changes

gulp.task(
  'watch',
  () => {
    gulp.watch('../source/html/**/*.html', ['deploy-markup']);
    gulp.watch('../source/css/**/*.scss', ['deploy-styles']);
    gulp.watch('../source/images/**/*.*', ['deploy-images']);
  }
)

// #endregion Watch For Changes

// #region Serve Content

gulp.task(
  'serve',
  () => {
    connect.server({
      root: '../docs',
      livereload: true
    });
  }
);

// #endregion Serve Content

// #endregion Development